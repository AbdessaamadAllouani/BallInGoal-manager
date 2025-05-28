<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeagueStats extends Model
{
    use HasFactory;
    protected $fillable = [
        'league_id',
        'total_goals',
        'yellow_cards',
        'red_cards',
        'most_offensive_team',
    ];
}
