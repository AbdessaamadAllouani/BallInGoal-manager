<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\League;
use App\Models\Standing;
use App\Models\Team;

use function Laravel\Prompts\select;

class FetchStandings extends Command
{
    protected $signature = 'fetch:standings {season}';
    protected $description = 'Fetch and store standings from API-Football';

    public function handle()
    {
        $season = $this->argument('season');

        $this->info("⏳ Récupération des classements pour la saison $season...");

        $leagues  = League::all();

        foreach ($leagues as $league) {
            $this->info("📦 Traitement de la ligue: {$league->name} (ID: {$league->api_id})");

            $response = Http::withHeaders([
                'x-apisports-key' => '07abcdb4dfbc0ca9bfcb603091185b33',
            ])->get('https://v3.football.api-sports.io/standings', [
                'league' => $league->api_id,
                'season' => $season,
            ]);

            
            

            if (!$response->successful()) {
                $this->error("❌ Erreur API pour la ligue: {$league->name}");
                continue;
            }

            if (!isset($response['response'][0]['league']['standings'][0])) {
                $this->warn("⚠️ Aucune donnée disponible pour la ligue: {$league->name}");
                continue;
            }

            $standings = $response['response'][0]['league']['standings'][0];

            foreach ($standings as $row) {

                if(!Team::where('api_id', $row['team']['id'])->exists()){
                    Team::create([
                        'api_id' => $row['team']['id'],
                        'name' => $row['team']['name'],
                        'logo' => $row['team']['logo'],
                    ]);
            }
                Standing::updateOrCreate(
                    [
                        'team_id' => Team::where('api_id', $row['team']['id'])->first()->id,
                        'league_id' => $league->id,
                        'season' => $season,
                    ],
                    [
                        'rank' => $row['rank'],
                        'team_name' => $row['team']['name'],
                        'points' => $row['points'],
                        'played' => $row['all']['played'],
                        'wins' => $row['all']['win'],
                        'draws' => $row['all']['draw'],
                        'losses' => $row['all']['lose'],
                        'goals_diff' => $row['goalsDiff'],
                        'team_logo' => $row['team']['logo'] ?? null,
                        'league_name' => $response['response'][0]['league']['name'] ?? null,
                        'league_logo' => $response['response'][0]['league']['logo'] ?? null,
                        'form' => $row['form'] ?? null,
                    ]
                );
                
            }

            $this->info("✅ Classement enregistré pour la ligue: {$league->name}");
        }

        $this->info('🎉 Tous les classements ont été mis à jour avec succès !');
    }
}
