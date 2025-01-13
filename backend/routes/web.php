<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WishController;


Route::prefix('api')->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);
    // Route::post('/wish', [WishController::class, 'create']);
    Route::post('/wish', [WishController::class, 'create']);
    Route::put('/wish/{id}', [WishController::class, 'update']);
    Route::get('/wish', [WishController::class, 'index']);
    Route::get('/wish/{id}', [WishController::class, 'show']);
    Route::delete('/wish/{id}', [WishController::class, 'destroy']);
    Route::get('/test', function () {
        return response()->json(data: ['message' => 'API is working']);
    });
    Route::get('/csrf-token', function () {
    return response()->json(['token' => csrf_token()]);
});
});
