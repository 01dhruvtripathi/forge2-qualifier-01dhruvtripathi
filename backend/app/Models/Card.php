<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

    protected $fillable = ['board_list_id', 'title', 'description', 'position', 'due_date'];

    protected $casts = [
        'due_date' => 'date',
    ];

    public function boardList()
    {
        return $this->belongsTo(BoardList::class);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class)->latest();
    }
}
