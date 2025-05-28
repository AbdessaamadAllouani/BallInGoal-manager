<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class League extends Model
{
    use HasFactory;
    protected $fillable = [
        'api_id',
        'name',
        'country',
        'logo',
    ];

    public function standings()
    {
        return $this->hasMany(Standing::class, 'league_id');
    }

    public function topScorers()
    {
        return $this->hasMany(TopScorer::class, 'league_id');
    }

    public function teams()
    {
        return $this->hasMany(Team::class, 'league_id');
    }
    public function teamStatistics (){
        return $this->hasOne(TeamStatistic::class, 'league_id');
    }
}
