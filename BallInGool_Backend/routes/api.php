<?php

use App\Http\Controllers\CommentController;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/news', fn() => \App\Models\News::orderBy("published_at","desc")->take(10)->get());
Route::get('/news/{id}', fn($id) => \App\Models\News::find($id));
Route::get("/allNews",fn() => \App\Models\News::orderBy("published_at","desc")->get());
Route::get('/news/{id}/comments', [CommentController::class, 'index']);
Route::post('/news/{id}/comments', [CommentController::class, 'store']);
Route::put('/news/{id}/comments', [CommentController::class, 'update']);
Route::delete('/news/{id}/comments', [CommentController::class, 'destroy']);

Route::get('/standings/{league}', function ($league) {
    $standings = \App\Models\Standing::where('league_id', $league)
        ->orderBy('rank')
        ->get();
    return response()->json($standings);
});

Route::get('/leagues', function () {
    return \App\Models\League::all();
});

Route::get("/products", function () {
    return \App\Models\Product::all();
});
 