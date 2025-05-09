<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matche extends Model
{
    use HasFactory;
    protected $fillable = [
        'api_id',
        'league_id',
        'home_team_id',
        'away_team_id',
        'date',
        'status',
        'home_score',
        'away_score',
    ];
    
}
