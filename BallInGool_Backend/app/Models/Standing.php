<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Standing extends Model
{
    use HasFactory;
    protected $fillable = [
        'team_id',
        'rank',
        'team_name',
        'points',
        'played',
        'wins',
        'draws',
        'losses',
        'goals_diff',
        'league_id',
        'season',
        'team_logo',
        'league_name',
        'league_logo',
        "form"

    ];
}
