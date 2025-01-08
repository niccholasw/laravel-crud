<?php

namespace App\Http\Controllers;

use App\Models\User;

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
        $user = new User();
        $user->name = request('name');
        $user->email = request('email');
        $user->save();
        return response()->json($user);
    }
}
