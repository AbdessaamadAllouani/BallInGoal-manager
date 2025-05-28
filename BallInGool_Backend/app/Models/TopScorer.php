<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TopScorer extends Model
{
    use HasFactory;

    protected $fillable = [
        "player_id",
        "team_id",
        "league_id",
        "goals",
    ];

    public function player()
    {
        return $this->belongsTo(Player::class, 'player_id');
    }
    public function team()
    {
        return $this->belongsTo(Team::class, 'team_id');
    }
    public function league()
    {
        return $this->belongsTo(League::class, 'league_id');
    }
}
