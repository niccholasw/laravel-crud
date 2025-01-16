<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Wish;
use Illuminate\Support\Facades\Log;
class WishController extends Controller
{
    // create friend wish
    // public function create()
    // {
    //     Log::info('Received wish request:', request()->all());
    //     $wish = new Wish();
    //     $wish->name = request('name');
    //     $wish->message = request('message');
    //     $wish->profile_picture = request('profile_picture');
    //     $wish->save();
    //     return response()->json($wish);
    // }
    public function create(Request $request)
    {
        $path = null;

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('profile_pictures', 'public');
        }

        // save data
        $wish = new Wish();
        $wish->name = $request->name;
        $wish->message = $request->message;
        $wish->profile_picture = $path; // Save path in database
        $wish->save();

        return response()->json(['message' => 'Wish created successfully', 'data' => $wish], 200);
    }

    // update friend wish
    public function update($id)
    {
        $wish = Wish::find($id);
        $wish->name = request('name');
        $wish->message = request('message');
        $wish->save();
        return response()->json(['message' => 'Wish to updated successfully']);
    }

    // get all friend wishes
    public function index()
    {
        $wishes = Wish::all();
        return response()->json($wishes);
    }

    // get friend wish by id
    public function show($id)
    {
        $wish = Wish::find($id);
        return response()->json($wish);
    }

    // delete friend wish
    public function destroy($id)
    {
        $wish = Wish::find($id);
        $wish->delete();
        return response()->json(['message' => 'Wish deleted successfully']);
    }

}
