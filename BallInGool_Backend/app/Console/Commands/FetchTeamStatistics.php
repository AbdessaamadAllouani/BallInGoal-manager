<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Team;
use App\Models\League;
use App\Models\Standing;
use App\Models\TeamStatistic;

class FetchTeamStatistics extends Command
{
    protected $signature = 'fetch:team-stats {season}';
    protected $description = 'Fetch team statistics for each league and store them';

    public function handle()
    {
        $season = $this->argument('season');
        $this->info("📊 Fetching team statistics for season $season");

        $leagues = League::all();

        foreach ($leagues as $league) {
            $teamIds = Standing::where('league_id', $league->id)
            ->where('season', $season)
            ->pluck('team_id');
        
        $teams = Team::whereIn('id', $teamIds)->get();
            

            foreach ($teams as $team) {
                $this->info("🔍 Team: {$team->name} | League: {$league->name}");

                $response = Http::withHeaders([
                    'x-apisports-key' => '07abcdb4dfbc0ca9bfcb603091185b33',
                ])->get('https://v3.football.api-sports.io/teams/statistics', [
                    'team' => $team->api_id,
                    'league' => $league->api_id,
                    'season' => $season,
                ]);

                if (!$response->successful()) {
                    $this->warn("⚠️ Failed for team: {$team->name}");
                    continue;
                }



                $data = $response->json()['response'];

                TeamStatistic::updateOrCreate(
                    [
                        'team_id' => $team->id,
                        'league_id' => $league->id,
                        'season' => $season,
                    ],
                    [
                        'played' => $data['fixtures']['played']['total'] ?? null,
                        'wins' => $data['fixtures']['wins']['total'] ?? null,
                        'draws' => $data['fixtures']['draws']['total'] ?? null,
                        'losses' => $data['fixtures']['loses']['total'] ?? null,
                        'goals_for' => $data['goals']['for']['total']['total'] ?? null,
                        'goals_against' => $data['goals']['against']['total']['total'] ?? null,
                        'clean_sheets' => $data['clean_sheet']['total'] ?? null,
                        'penalties_scored' => $data['penalty']['scored']['total'] ?? null,
                        'penalties_missed' => $data['penalty']['missed']['total'] ?? null,
                        'points' => ($data['fixtures']['wins']['total'] ?? 0) * 3 + ($data['fixtures']['draws']['total'] ?? 0),
                    ]
                );

                $this->info("✅ Stats enregistrées pour {$team->name}");
            }
        }

        $this->info("🎉 Toutes les statistiques ont été mises à jour !");
    }
}
