<?php

use App\Http\Controllers\CommentController;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleAuthController;


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

Route::get('/auth/google/redirect', [GoogleAuthController::class, 'redirect']);
Route::get('/auth/google/callback', [GoogleAuthController::class, 'callback']);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/signUp', [\App\Http\Controllers\AutoController::class, 'signUp']);
Route::post('/signIn', [\App\Http\Controllers\AutoController::class, 'signIn']);
Route::post('/signOut', [\App\Http\Controllers\AutoController::class, 'signOut'])->middleware("auth:sanctum");

Route::get('/news', fn() => \App\Models\News::orderBy("published_at","desc")->take(10)->get());
Route::get('/news/{id}', fn($id) => \App\Models\News::find($id));
Route::get("/allNews",fn() => \App\Models\News::orderBy("published_at","desc")->get());
Route::get('/news/{id}/comments', [CommentController::class, 'index']);
Route::post('/news/comments', [CommentController::class, 'store']);
Route::put('/news/comments/{id}', [CommentController::class, 'update']);
Route::delete('/news/comments/{id}', [CommentController::class, 'destroy']);
Route::post('/comments/{id}/like', [CommentController::class, 'like'])->middleware("auth:sanctum");
// Route::get('/news/comments/{id}/like', [CommentController::class, 'like']);
// Route::get('/news/comments/{id}/dislike', [CommentController::class, 'dislike']);
Route::post('/comments/{id}/dislike', [CommentController::class, 'dislikeComment']);


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
 