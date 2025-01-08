<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Wish;
class WishController extends Controller
{
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
