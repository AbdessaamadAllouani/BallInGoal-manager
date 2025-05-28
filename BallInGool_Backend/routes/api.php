<?php

use App\Http\Controllers\CommentController;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleAuthController;
use App\Models\Team;

use function Laravel\Prompts\error;

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

Route::post('updateUser', [\App\Http\Controllers\AutoController::class, 'updateUser'])->middleware("auth:sanctum");

Route::post('/signUp', [\App\Http\Controllers\AutoController::class, 'signUp']);
Route::post('/signIn', [\App\Http\Controllers\AutoController::class, 'signIn']);
Route::post('/signOut', [\App\Http\Controllers\AutoController::class, 'signOut'])->middleware("auth:sanctum");

Route::get('/news', fn() => \App\Models\News::orderBy("published_at","desc")->take(10)->get());
Route::get('/news/{id}', fn($id) => \App\Models\News::find($id));
Route::get("/allNews",fn() => \App\Models\News::orderBy("published_at","desc")->get());
Route::post("/news",function(Request $request){
    $request->validate([
        'title' => 'required|string|max:255',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        'description' => 'required|string',
        'content' => 'required|string'     
    ]);
    $artecl = new \App\Models\News();
    $artecl->title = $request->title;
    $artecl->image = $request->file('image')->store('images', 'public');
    $artecl->description = $request->description;
    $artecl->content = $request->content;
    $artecl->save();
    return response()->json(["news"=>$artecl,"message"=>"le news est enregistrer avec sucser"],201);

});

Route::delete("/news/{id}",function($id){
    $artecl = \App\Models\News::find($id);
    if ($artecl) {
        $artecl->delete();
        return response()->json(["message"=>"le produit est supprimer avec sucser"],200);
    }
    return response()->json(["message"=>"le produit n'existe pas"],404);
}
);
Route::get('/news/{id}/comments', [CommentController::class, 'index']);
Route::post('/news/comments', [CommentController::class, 'store']);
Route::put('/comments/{id}', [CommentController::class, 'update']);
Route::delete('/news/comments/{id}', [CommentController::class, 'destroy']);
Route::post('/comments/{id}/like', [CommentController::class, 'like'])->middleware("auth:sanctum");
// Route::get('/news/comments/{id}/like', [CommentController::class, 'like']);
// Route::get('/news/comments/{id}/dislike', [CommentController::class, 'dislike']);
Route::post('/comments/{id}/dislike', [CommentController::class, 'dislike'])->middleware("auth:sanctum");


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

Route::post("/products", function (Request $request) {
    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        'description' => 'nullable|string',
        // 'category' => 'nullable|string',
        'stock' => 'nullable|integer',
        // 'size' => 'nullable|string',
        // 'color' => 'nullable|string',
    ]);
    
    $product = new \App\Models\Product();
    $product->name = $request->name;
    $product->price = $request->price;
    $product->image = $request->file('image')->store('images', 'public');
    $product->description = $request->description;
    $product->stock = $request->stock;
    $product->save();
    return response()->json(["product"=>$product,"message"=>"le produit est enregistrer avec sucser"],201);
});

Route::delete("/products/{id}", function ($id) {
    $product = \App\Models\Product::find($id);
    if ($product) {
        $product->delete();
        return response()->json(["message"=>"le produit est supprimer avec sucser"],200);
    }
    return response()->json(["message"=>"le produit n'existe pas"],404);
});

Route::post("/products/{id}", function (Request $request, $id) {
    $request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        'description' => 'nullable|string',
        // 'category' => 'nullable|string',
        'stock' => 'nullable|integer',
        // 'size' => 'nullable|string',
        // 'color' => 'nullable|string',
    ]);
    $product = \App\Models\Product::find($id);
    if ($product) {
        $product->name = $request->name;
        $product->price = $request->price;
        if ($request->hasFile('image')) {
            $product->image = $request->file('image')->store('images', 'public');
        }
        $product->description = $request->description;
        $product->stock = $request->stock;
        // $product->category = $request->category;
        // $product->size = $request->size;
        // $product->color = $request->color;
        $product->save();
       return response()->json(["message"=>"le produit est modifier avec sucser"],200);
    }
    return response()->json(["message"=>"le produit n'existe pas"],404);
});

Route::get("/teams", function () {
    return \App\Models\Team::all();
});

Route::get("/league/top/{league}", function ($league) {
    return \App\Models\TopScorer::with("player")->with("team")
        ->where('league_id', $league)
        ->get();
});

Route::get("/Statistique/Club/{id}",function($id){
    $teamStatistic = \App\Models\Team::with(["teamStatistic","players"])->findOrFail($id);
    if($teamStatistic){
        return response()->json($teamStatistic);
    }
    return response()->json(["message"=>"les statistique n'est exist pas"]);
});


 