<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'content',
        'author',
        'url',
        'source',
        'image',
        'published_at',
    ];
    protected $casts = [
        'published_at' => 'datetime',
    ];
    protected $table = 'news';
    public function getRouteKeyName()
    {
        return 'id';
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
