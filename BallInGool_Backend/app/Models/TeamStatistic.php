<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamStatistic extends Model
{
    use HasFactory;
    protected $fillable=[
        'team_id',
        'league_id',
        'season',
        'played',
        'wins',
        'draws',
        'losses',
        'goals_for',
        'goals_against',
        'points',
        'clean_sheets',
        'penalties_scored',
        'penalties_missed',
    ];
    public function team (){
        return $this->belongsTo(Team::class);
    }


    public function league (){
        return $this->belongsTo(League::class);
    }

}
