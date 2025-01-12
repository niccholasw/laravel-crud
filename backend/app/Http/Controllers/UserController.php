<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Wish;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::find($id);
        return response()->json($user);
    }

    public function create()
    {
        Log::info('Creating new user request recieved:', request()->all());
        $user = new User();
        $user->name = request('name');
        $user->email = request('email');
        $user->save();
        return response()->json($user);
    }
}
