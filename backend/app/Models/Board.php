<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Board extends Model
{
    use HasFactory;

    protected $fillable = ['title'];

    public function lists()
    {
        return $this->hasMany(BoardList::class)->orderBy('position');
    }
}
