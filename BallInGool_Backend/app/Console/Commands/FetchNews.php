<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\News;
use Illuminate\Support\Facades\Http;
use Symfony\Component\DomCrawler\Crawler;
use Illuminate\Support\Str;

class FetchNews extends Command
{
    protected $signature = 'fetch:news';
    protected $description = 'Fetch latest news from NewsAPI, extract full content, and store in DB';

    public function handle()
    {
        $apiKey = 'ce937d460f99444d9e37e3b2d8164407';

        // 1. Récupération des articles depuis NewsAPI
        $response = Http::timeout(30)->retry(3, 100)->get("https://newsapi.org/v2/everything", [
            'q' => 'football',
            'language' => 'fr',
            'apiKey' => $apiKey,
            'sortBy' => 'publishedAt',
            'pageSize' => 50, // Max 100 pour les comptes payants
        ]);

        if (!$response->ok()) {
            $this->error('Échec de la récupération. Statut : ' . $response->status());
            return;
        }

        $articles = $response->json()['articles'];

        if (empty($articles)) {
            $this->warn('Aucun article trouvé.');
            return;
        }

        // 2. Scraping du contenu complet pour chaque article
        foreach ($articles as $article) {
            try {
                $fullContent = $this->scrapeFullContent($article['url']);
            } catch (\Exception $e) {
                $this->warn('Échec du scraping pour : ' . $article['url']);
                $fullContent = null;
            }

            // 3. Prévention des doublons avec un hash unique
            // $uniqueHash = md5($article['url'] . $article['publishedAt']);

            News::updateOrCreate(
                // ['unique_hash' => $uniqueHash],
                ['url' => $article['url'], 'published_at' => $article['publishedAt']],
                [
                    'title' => $article['title'],
                    'description' => $article['description'],
                    'content' => $fullContent ?? $this->cleanTruncatedContent($article['content']),
                    'author' => $article['author'] ?? 'Anonyme',
                    'url' => $article['url'],
                    'source' => $article['source']['name'] ?? 'Inconnu',
                    'image' => $article['urlToImage'],
                    'published_at' => $article['publishedAt'],
                ]
            );

            // Délai pour éviter le blocage
            usleep(500000); // 0.5 seconde entre les requêtes
        }

        $this->info(count($articles) . ' articles mis à jour avec succès !');
    }

    /**
     * Scrape le contenu complet depuis l'URL de l'article
     */
    private function scrapeFullContent(string $url): ?string
    {
        $html = Http::withHeaders([
            'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...',
        ])->timeout(20)->get($url)->body();

        $crawler = new Crawler($html);

        // Logique générique pour cibler le contenu (à adapter par site)
        $content = $crawler->filter('p, div.article-content')->each(function (Crawler $node) {
            return $node->text();
        });
        $content = implode("\n", $content);
        $content = preg_replace('/\s+/', ' ', $content); // Nettoyage des espaces
        $content = preg_replace('/\[\+\d+ chars\]/', '', $content); // Suppression des annotations

        return Str::limit(trim($content), 65000); // Limite MySQL pour TEXT
    }

    // /**
    //  Nettoie le contenu tronqué de NewsAPI
    //  */
    private function cleanTruncatedContent(?string $content): ?string
    {
        if (!$content) return null;

        return Str::of($content)
            ->replaceMatches('/\[\+\d+ chars\]/', '[...]')
            ->limit(65000);
    }
}