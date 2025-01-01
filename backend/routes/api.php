<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ExampleController;

Route::get('/example', [ExampleController::class, 'index']);

Route::get('/posts', [PostController::class, 'index']);
