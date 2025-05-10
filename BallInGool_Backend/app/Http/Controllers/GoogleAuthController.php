<?php

namespace App\Http\Controllers;

use App\Models\User;
use Laravel\Socialite\Facades\Socialite;
use App\Http\Controllers\Controller;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::updateOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName(),
                'google_id' => $googleUser->getId(),
                // 'telephone' => $googleUser->getphone()??null,
                'password' => bcrypt(Str::random(24)),
            ]
        );

        $token = $user->createToken('googleToken')->plainTextToken;

        return redirect()->to("http://localhost:5173/google-success?token=$token");
    }
}
