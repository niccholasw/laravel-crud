<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Wish;
use Illuminate\Support\Facades\Log;
class WishController extends Controller
{

    public function create()
    {
        Log::info('Received wish request:', request()->all());
        $wish = new Wish();
        $wish->name = request('name');
        $wish->message = request('message');
        $wish->save();
        return response()->json($wish);
    }

    public function update($id)
    {
        $wish = Wish::find($id);
        $wish->name = request('name');
        $wish->message = request('message');
        $wish->save();
        return response()->json(['message' => 'Wish to updated successfully']);
    }

    public function index()
    {
        $wishes = Wish::all();
        return response()->json($wishes);
    }

    public function show($id)
    {
        $wish = Wish::find($id);
        return response()->json($wish);
    }

    public function destroy($id)
    {
        $wish = Wish::find($id);
        $wish->delete();
        return response()->json(['message' => 'Wish deleted successfully']);
    }

    public function updateProfilePicture(Request $request, Wish $wish)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('profile_picture')) {
            // Save the file in the 'public/profile_pictures' directory
            $filePath = $request->file('profile_picture')->store('profile_pictures', 'public');

            // Update the Wish model
            $wish->update([
                'profile_picture' => $filePath,
            ]);

            return response()->json([
                'message' => 'Profile picture updated successfully!',
                'profile_picture_url' => asset('storage/' . $filePath),
            ]);
        }

        return response()->json(['message' => 'No image uploaded'], 400);
    }

}
