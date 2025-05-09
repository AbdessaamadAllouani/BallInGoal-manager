<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'news_id',
        'comment',
        'like_count',
        'dislike_count',
        'is_edited',
        'is_response',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function news()
    {
        return $this->belongsTo(News::class);
    }
    public function likes()
{
    return $this->hasMany(Like::class);
}

}
