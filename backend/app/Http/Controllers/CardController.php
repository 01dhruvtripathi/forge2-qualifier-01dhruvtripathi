<?php

namespace App\Http\Controllers;

use App\Models\Card;
use Illuminate\Http\Request;

class CardController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'board_list_id' => 'required|exists:board_lists,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'position' => 'nullable|integer',
            'due_date' => 'nullable|date',
        ]);
        
        $card = Card::create($validated);
        return response()->json($card, 201);
    }

    public function update(Request $request, Card $card)
    {
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|date',
        ]);
        
        $card->update($validated);
        return response()->json($card->load('tags', 'users'));
    }

    public function move(Request $request, Card $card)
    {
        $validated = $request->validate([
            'board_list_id' => 'required|exists:board_lists,id',
            'position' => 'nullable|integer',
        ]);

        $card->update($validated);
        return response()->json($card);
    }

    public function attachTag(Request $request, Card $card)
    {
        $validated = $request->validate([
            'tag_id' => 'required|exists:tags,id',
        ]);
        $card->tags()->syncWithoutDetaching([$validated['tag_id']]);
        return response()->json($card->load('tags', 'users'));
    }

    public function attachUser(Request $request, Card $card)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);
        $card->users()->syncWithoutDetaching([$validated['user_id']]);
        
        $user = \App\Models\User::find($validated['user_id']);
        \Illuminate\Support\Facades\Mail::to($user->email)->send(new \App\Mail\CardAssigned($card));

        return response()->json($card->load('tags', 'users'));
    }

    public function destroy(Card $card)
    {
        $card->delete();
        return response()->json(null, 204);
    }
}
