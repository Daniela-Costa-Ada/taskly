<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'is_completed' => false,
        ]);

        return response()->json(['task' => $task], 201);
    }

    public function index(Request $request)
    {

        $query = Task::query();

        if ($request->has('is_completed')) {
            $query->where('is_completed', $request->is_completed);
        }


        $tasks = $query->get();

        return response()->json(['tasks' => $tasks]);
    }

}
