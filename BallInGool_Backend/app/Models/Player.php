<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;
    protected $fillable = [
        'api_id',
        'team_id',
        'photo',
        'name',
        'age',];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }

    public function topScorers()
    {
        return $this->hasMany(TopScorer::class, 'player_id');
    }

    
        
}
