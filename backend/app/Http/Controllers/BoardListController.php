<?php

namespace App\Http\Controllers;

use App\Models\BoardList;
use Illuminate\Http\Request;

class BoardListController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'board_id' => 'required|exists:boards,id',
            'title' => 'required|string|max:255',
            'position' => 'nullable|integer',
        ]);
        
        $list = BoardList::create($validated);
        return response()->json($list, 201);
    }

    public function destroy(BoardList $boardList)
    {
        $boardList->delete();
        return response()->json(null, 204);
    }
}
