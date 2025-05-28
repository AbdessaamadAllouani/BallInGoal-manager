<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AutoController extends Controller
{
    public function signUp(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'telephone' => 'required|string|max:15',
            'password' => 'required|string|min:8|confirmed',
            'userType' => 'required|in:admin,user,league,team',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'password' => bcrypt($request->password),
            'role' => $request->userType,
            'image' => $request->image ? $request->file('image')->store('images', 'public') : null,
            'role' => $request->userType,
        ]);

        $token = $user->createToken('Personal Access Token')->plainTextToken;

        return response()->json(['user' => $user,"token"=>$token], 201);
    }
    public function signIn(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = auth()->user();
        $token = $user->createToken('Personal Access Token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function signOut(Request $request)
    {
        $user = Auth::user();
        if ($user) {
            $user->tokens()->delete();
            return response()->json(['message' => 'Logged out successfully']);
        }

        return response()->json(['message' => 'User not found'], 404);
    }

    public function updateUser(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string|max:15',
            'password' => 'nullable|string|min:8|confirmed',
            "image" => "nullable|image|mimes:jpeg,png,jpg,gif|max:2048",
        ]);

        if ($user) {
            $user = $user->updateOrCreate(
                ['id' => $user->id],
                [
                    'name' => $request->name,
                    'email' => $request->email,
                    'telephone' => $request->phone,
                    'image' => $request->image ? $request->file('image')->store('images', 'public') : $user->image,
                    'password' => $request->password ? bcrypt($request->password) : $user->password,
                ]
            );
            return response()->json(['user'=>$user,'message' => 'User updated successfully']);
        }

        return response()->json(['message' => 'User not found'], 404);
    }
}
