<?php

use App\Http\Controllers\BoardController;
use App\Http\Controllers\BoardListController;
use App\Http\Controllers\CardController;
use App\Models\Tag;
use App\Models\User;
use Illuminate\Support\Facades\Route;

Route::get('/boards', [BoardController::class, 'index']);
Route::post('/boards', [BoardController::class, 'store']);
Route::get('/boards/{board}', [BoardController::class, 'show']);
Route::delete('/boards/{board}', [BoardController::class, 'destroy']);

Route::post('/lists', [BoardListController::class, 'store']);
Route::delete('/lists/{boardList}', [BoardListController::class, 'destroy']);

Route::post('/cards', [CardController::class, 'store']);
Route::put('/cards/{card}', [CardController::class, 'update']);
Route::delete('/cards/{card}', [CardController::class, 'destroy']);
Route::put('/cards/{card}/move', [CardController::class, 'move']);
Route::post('/cards/{card}/tags', [CardController::class, 'attachTag']);
Route::post('/cards/{card}/users', [CardController::class, 'attachUser']);
Route::post('/cards/{card}/comments', [\App\Http\Controllers\CommentController::class, 'store']);

Route::get('/tags', function () {
    return Tag::all();
});
Route::post('/tags', function (Illuminate\Http\Request $request) {
    return Tag::create($request->validate(['name' => 'required', 'color' => 'nullable']));
});

Route::get('/users', function () {
    return User::all();
});
