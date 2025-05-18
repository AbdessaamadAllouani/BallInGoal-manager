<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Like;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index($id)
    {
        // Fetch all comments from the database
        $comments = Comment::where('news_id', $id)
            ->with(['user:id,name,image', 'news:id,title'])
            ->orderBy('created_at', 'desc')
            ->get();

        // Return the comments to the view
        return response()->json(["comments"=>$comments, 'status' => 'success']);
    }

    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'news_id' => 'required|exists:news,id',
            'user_id' => 'required|exists:users,id',
            'comment' => 'required|string|max:255',
            'is_response' => 'integer|nullable',
        ]);

        // Create a new comment

        $comment = Comment::create([
            'news_id' => $request->news_id,
            'user_id' => $request->user_id,
            'comment' => $request->comment,
            'is_response' => $request->is_response,
        ])->with(['user:id,name,image', 'news:id,title'])
            ->orderBy('created_at', 'desc')
            ->first();

        // Return the created comment
        return response()->json(['comment' => $comment, 'status' => 'success']);
    }

    function update(Request $request, $id)
    {
        // Validate the request data
        $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        // Find the comment by ID
        $comment = Comment::findOrFail($id);

        // Update the comment
        $comment->update([
            'comment' => $request->comment,
            'is_edited' => true,
        ]);

        // Return the updated comment
        return response()->json(['comment' => $comment, 'status' => 'success']);
    }

    public function destroy($id)
    {
        // Find the comment by ID
        $comment = Comment::findOrFail($id);

        // Delete the comment
        $comment->delete();

        // Return a success message
        return response()->json(['message' => 'Comment deleted successfully', 'status' => 'success']);
    }

    public function like($id)
    {
        $user = auth()->user();
        $comment = Comment::findOrFail($id);
    
        $alreadyLiked = Like::where('user_id', $user->id)
                            ->where('comment_id', $id)
                            ->where('type', true)
                            ->first();
    
        if ($alreadyLiked) {
            $alreadyLiked->delete();
            $comment->decrement('like_count');
            return response()->json(["comment"=>$comment,'message' => false]);

        }
    
        Like::create([
            'user_id' => $user->id,
            'comment_id' => $id,
            'type' => true
        ]);
        $comment->increment('like_count');

    
        return response()->json(['comment' => $comment, 'message' => true]);
    }
    
    public function dislike($id)
    {
        $user = auth()->user();
        $comment = Comment::findOrFail($id);
    
        $alreadyLiked = Like::where('user_id', $user->id)
                            ->where('comment_id', $id)
                            ->where("type",false)
                            ->first();
    
        if ($alreadyLiked) {
            $alreadyLiked->delete();
            $comment->decrement('dislike_count');
            return response()->json(["comment"=>$comment,'message' => false]);

        }
    
        Like::create([
            'user_id' => $user->id,
            'comment_id' => $id,
            'type'=> false
        ]);
        $comment->increment('dislike_count');

    
        return response()->json(['comment' => $comment, 'message' => true]);
    }
}
