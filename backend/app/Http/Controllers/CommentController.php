<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Card $card)
    {
        $validated = $request->validate([
            'content' => 'required|string',
            'user_id' => 'nullable|exists:users,id',
        ]);

        $comment = $card->comments()->create($validated);
        
        return response()->json($comment->load('user'), 201);
    }
}
