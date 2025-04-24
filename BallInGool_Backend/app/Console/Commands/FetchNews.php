<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\News;
use Illuminate\Support\Facades\Http;

class FetchNews extends Command
{
    protected $signature = 'fetch:news';
    protected $description = 'Fetch latest news from NewsAPI and store in DB';

    public function handle()
    {
        $apiKey = 'ce937d460f99444d9e37e3b2d8164407';

$response = Http::get("https://newsapi.org/v2/everything", [
    'q' => 'football',
    'language' => 'fr',
    'apiKey' => $apiKey,
    'sortBy' => 'publishedAt',
    // 'pageSize' => 50,
]);


        if ($response->ok()) {
            $articles = $response->json()['articles'];

            if (empty($articles)) {
                $this->warn('API returned no articles.');
                return;
            }

            foreach ($articles as $article) {
                News::updateOrCreate([
                    'title' => $article['title'],
                ], [
                    'description' => $article['description'],
                    'url' => $article['url'],
                    'source' => $article['source']['name'] ?? 'Unknown',
                    'image' => $article['urlToImage'],
                    'published_at' => $article['publishedAt'],
                ]);
            }

            $this->info('News fetched and stored successfully!');
        } else {
            $this->error('Failed to fetch news. Status: ' . $response->status());
            dd($response->json());
        }
    }
}
