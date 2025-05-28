<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;
    protected $fillable = [
        'api_id',
        'name',
        'logo',
        // 'country',
        // 'league_id',
    ];

    public function players()
    {
        return $this->hasMany(Player::class);
    }
    public function league()
    {
        return $this->belongsTo(League::class, 'league_id');
    }
    public function topScorers()
    {
        return $this->hasMany(TopScorer::class, 'team_id');
    }
    public function standings()
    {
        return $this->hasMany(Standing::class, 'team_id');
    }

    public function teamStatistic (){
        return $this->hasOne(TeamStatistic::class, 'team_id');
    }
}
