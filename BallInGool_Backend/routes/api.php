<?php

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

Route::get('/news', fn() => \App\Models\News::latest()->take(10)->get());
Route::get('/news/{id}', fn($id) => \App\Models\News::find($id));
Route::get("/allNews",fn() => \App\Models\News::orderBy("published_at","desc")->get());


