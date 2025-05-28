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
        // $this->fetchLeagues();
        // $this->fetchTeams();
        // $this->fetchPlayers();
        // $this->fetchMatches();
        $this->fetchLeagueStats();
        $this->fetchTopScorers();
    }

    protected function fetchLeagues()
{
    $ids = [ 307];

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

    protected function fetchTopScorers()
{
    $leagues = League::all();

    foreach ($leagues as $league) {
        $response = Http::withHeaders([
            'x-apisports-key' => '07abcdb4dfbc0ca9bfcb603091185b33',
        ])->get("https://v3.football.api-sports.io/players/topscorers", [
            'league' => $league->api_id,
            'season' => 2023
        ]);

        if ($response->failed()) {
            $this->error("Failed to fetch top scorers for {$league->name}");
            continue;
        }

        foreach (array_slice($response['response'], 0, 5) as $item) {
            $playerApiId = $item['player']['id'];
            $player = Player::where('api_id', $playerApiId)->first();
            $team = Team::where('api_id', $item['statistics'][0]['team']['id'])->first();

            if ($player && $team) {
                \App\Models\TopScorer::updateOrCreate(
                    ['player_id' => $player->id],
                    [
                        'team_id' => $team->id,
                        'league_id' => $league->id,
                        'goals' => $item['statistics'][0]['goals']['total'] ?? 0
                    ]
                );
            }
        }

        $this->info("Top 5 scorers for {$league->name} imported.");
        sleep(6);
    }
}

protected function fetchLeagueStats()
{
    $leagues = League::all();

    foreach ($leagues as $league) {
        $response = Http::withHeaders([
            'x-apisports-key' => '07abcdb4dfbc0ca9bfcb603091185b33',
        ])->retry(3, 1000) // يعيد المحاولة 3 مرات بفاصل 1 ثانية إذا فشل
          ->get('https://v3.football.api-sports.io/fixtures', [
              'league' => $league->api_id,
              'season' => 2023
          ]);

        if (!$response->successful() || !isset($response['response'])) {
            $this->error("Failed to fetch fixtures for league {$league->name}");
            continue;
        }

        $fixtures = $response['response'];
        $totalGoals = 0;
        $yellow = 0;
        $red = 0;
        $teamGoals = [];

        foreach ($fixtures as $match) {
            // تأكد من وجود بيانات الأهداف
            $homeGoals = $match['goals']['home'] ?? 0;
            $awayGoals = $match['goals']['away'] ?? 0;

            $totalGoals += $homeGoals + $awayGoals;

            // حساب أهداف كل فريق
            foreach (['home', 'away'] as $side) {
                if (isset($match['teams'][$side])) {
                    $teamId = $match['teams'][$side]['id'] ?? null;
                    $goals = $match['goals'][$side] ?? 0;
                    if ($teamId !== null) {
                        if (!isset($teamGoals[$teamId])) {
                            $teamGoals[$teamId] = 0;
                        }
                        $teamGoals[$teamId] += $goals;
                    }
                }
            }

            // حساب البطاقات
            if (isset($match['players']) && is_array($match['players'])) {
                foreach ($match['players'] as $teamPlayers) {
                    if (isset($teamPlayers['players']) && is_array($teamPlayers['players'])) {
                        foreach ($teamPlayers['players'] as $player) {
                            if (isset($player['statistics']) && is_array($player['statistics'])) {
                                foreach ($player['statistics'] as $stat) {
                                    $yellow += $stat['cards']['yellow'] ?? 0;
                                    $red += $stat['cards']['red'] ?? 0;
                                }
                            }
                        }
                    }
                }
            }
        }

        // إيجاد الفريق الأكثر هجومًا
        arsort($teamGoals);
        $topTeamApiId = array_key_first($teamGoals) ?: null;
        $topTeamName = null;
        if ($topTeamApiId) {
            $topTeamName = Team::where('api_id', $topTeamApiId)->value('name');
        }

        \App\Models\LeagueStats::updateOrCreate(
            ['league_id' => $league->id],
            [
                'total_goals' => $totalGoals,
                'yellow_cards' => $yellow,
                'red_cards' => $red,
                'most_offensive_team' => $topTeamName
            ]
        );

        $this->info("Stats for league {$league->name} imported.");
        sleep(6); // مراعاة حدود API
    }
}

}