<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

use App\Models\League;
use App\Models\Team;
use App\Models\Player;
use App\Models\Match;
use App\Models\Matche;

class FetchFootballData extends Command
{
    protected $signature = 'football:fetch';
    protected $description = 'Fetch leagues, teams, players, and matches from API';

    public function handle()
    {
        $this->fetchLeagues();
        // $this->fetchTeams();
        // $this->fetchPlayers();
        // $this->fetchMatches();
    }

    protected function fetchLeagues()
    {
        $ids = [307, 1, 4, 9, 6, 14, 15, 2, 3, 848, 13, 21, 39, 140, 135, 78, 61, 71, 283, 94, 88];

        foreach ($ids as $id) {
            $response = Http::withHeaders([
                'x-apisports-key' => '07abcdb4dfbc0ca9bfcb603091185b33',
            ])->get('https://v3.football.api-sports.io/leagues', [
                'id' => $id,
            ]);

            if ($response->failed()) {
                $this->error("Failed to fetch league with ID $id. Status: " . $response->status());
                continue;
            }

            $item = $response['response'][0] ?? null;

            if (!$item) {
                $this->warn("No league data found for ID $id.");
                continue;
            }

            League::updateOrCreate(
                ['api_id' => $item['league']['id']],
                [
                    'name' => $item['league']['name'],
                    'country' => $item['country']['name'],
                    'logo' => $item['league']['logo'],
                ]
            );

            $this->info("League '{$item['league']['name']}' imported.");
            sleep(6);
        }

        $this->info("All leagues processed.");
    }


    protected function fetchTeams()
    {
        $leagues = League::all();

        $response = Http::withHeaders([
            'x-apisports-key' => '07abcdb4dfbc0ca9bfcb603091185b33',
        ])->get("https://v3.football.api-sports.io/teams", [
            'season' => 2023
        ]);

        if ($response->failed()) {
            $this->error('Failed to fetch teams. Status: ' . $response->status());
            return;
        }

        foreach ($leagues as $league) {
            foreach ($response['response'] as $item) {
                Team::updateOrCreate(
                    ['api_id' => $item['team']['id']],
                    [
                        'name' => $item['team']['name'],
                        'logo' => $item['team']['logo'],
                    ]
                );
            }
            sleep(6);
            $this->info("Teams for league '{$league->name}' imported.");
        }
        $this->info("Teams imported!");
    }

    protected function fetchPlayers()
    {
        $teams = Team::all();
        foreach ($teams as $team) {
            $response = Http::withHeaders([
                'x-apisports-key' => '07abcdb4dfbc0ca9bfcb603091185b33',
            ])->get("https://v3.football.api-sports.io/players", [
                'team' => $team->api_id,
                'season' => 2023
            ]);

            if ($response->failed()) {
                $this->error('Failed to fetch players for team ' . $team->name . '. Status: ' . $response->status());
                continue;
            }

            // foreach ($response['response'] as $item) {
            //     $photo = $item['player']['photo'] ?? 'no-photo';
            //     $this->line("ID: {$item['player']['id']} - Name: {$item['player']['name']} - Photo: $photo");
            // }
            // exit;

            foreach ($response['response'] as $item) {
                $photo = $item['player']['photo'] ?? 'no-photo';
                Player::updateOrCreate(
                    ['api_id' => $item['player']['id']],
                    [
                        'name' => $item['player']['name'],
                        'photo' => $photo,
                        'team_id' => $team->id,
                    ]
                );
            }
            sleep(6);
            $this->info("Players for team '{$team->name}' imported.");
        }
        $this->info("Players imported!");
    }


    protected function fetchMatches()
    {
        $leagues = League::all();
        foreach ($leagues as $league) {
            $response = Http::withHeaders([
                'x-apisports-key' => '07abcdb4dfbc0ca9bfcb603091185b33',
            ])->get("https://v3.football.api-sports.io/fixtures", [
                'league' => $league->api_id,
                'season' => 2023
            ]);

            if ($response->failed()) {
                $this->error('Failed to fetch matches for league ' . $league->name . '. Status: ' . $response->status());
                continue;
            }

            foreach ($response['response'] as $item) {
                $match = $item['fixture'];
                $teams = $item['teams'];
                $score = $item['goals'];

                Matche::updateOrCreate(
                    ['api_id' => $match['id']],
                    [
                        'home_team_id' => Team::where('api_id', $teams['home']['id'])->value('id'),
                        'away_team_id' => Team::where('api_id', $teams['away']['id'])->value('id'),
                        'league_id' => $league->id,
                        'date' => $match['date'],
                        'home_score' => $score['home'],
                        'away_score' => $score['away'],
                        'status' => $match['status']['short']
                    ]
                );
            }
            sleep(6);
            $this->info("Matches for league '{$league->name}' imported.");
        }
        $this->info("Matches imported!");
    }
}
