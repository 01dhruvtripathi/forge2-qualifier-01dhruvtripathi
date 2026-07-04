<?php

namespace App\Http\Controllers;

use App\Models\Board;
use Illuminate\Http\Request;

class BoardController extends Controller
{
    public function index()
    {
        return Board::with('lists.cards.tags', 'lists.cards.users')->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);
        
        $board = Board::create($validated);
        return response()->json($board, 201);
    }

    public function show(Board $board)
    {
        return $board->load('lists.cards.tags', 'lists.cards.users');
    }

    public function destroy(Board $board)
    {
        $board->delete();
        return response()->json(null, 204);
    }
}
