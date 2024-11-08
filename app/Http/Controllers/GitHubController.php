<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;

class GitHubController extends Controller
{
    public function getUserRepos($username)
    {
        $response = Http::get("https://api.github.com/users/{$username}/repos");

        // Returns data from repositories
        return response()->json($response->json());
    }
}
