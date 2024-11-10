<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;

/**
 * TaskController
 *
 * This controller manages all task operations, including creation, listing, status update,
 * and deletion. It follows RESTful principles and uses appropriate HTTP status codes to ensure
 * clear communication with the API.
 */
class TaskController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data to ensure the title is required,
        // and description (if provided) should be a string.
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Create a new task in the database with the validated data.
        // The 'is_completed' parameter will default to 0 if not provided in the request.
        $task = Task::create([
            'title' => $request->title,
            'description' => $request->description,
            'is_completed' => $request->has('is_completed') ? $request->is_completed : 0,
        ]);

        // Return the newly created task with status 201 (Created) and the task data.
        return response()->json(['task' => $task], 201);
    }

    public function index(Request $request)
    {
        // Validate the 'is_completed' parameter, which is optional and should be a boolean (true/false).
        $validated = $request->validate([
            'is_completed' => 'nullable|boolean',
        ], [
            'is_completed.boolean' => 'The is_completed parameter must be a boolean value (true or false).',
            'is_completed.nullable' => 'The is_completed parameter is optional.',
        ]);

        // Start the query to fetch all tasks.
        $query = Task::query();

        // If the 'is_completed' parameter is present, filter tasks by this value.
        if (isset($validated['is_completed'])) {
            $query->where('is_completed', $validated['is_completed']);
        }

        // Get all tasks, either filtered or unfiltered, depending on the request.
        $tasks = $query->get();

        // If no tasks are found, return a 204 (No Content) response.
        if ($tasks->isEmpty()) {
            return response()->json(['message' => 'No tasks found.'], 204);
        }

        // Return the tasks found with status 200 (OK).
        return response()->json([
            'tasks' => $tasks,
        ], 200);
    }

    public function updateStatus($id, Request $request)
    {
        // Find the task by ID. If not found, it will automatically return a 404 error.
        $task = Task::findOrFail($id);

        // Validate the 'is_completed' parameter, which is required and must be a boolean value.
        $request->validate([
            'is_completed' => 'required|boolean',
        ]);

        // Update the 'is_completed' status of the task.
        $task->is_completed = $request->is_completed;

        // Attempt to save the updated task and return a 200 (OK) response if successful.
        if ($task->save()) {
            return response()->json([
                'message' => 'Task updated successfully.',
                'task' => $task,
            ], 200);
        }

        // If there is an error saving the task, return a 500 (Internal Server Error).
        return response()->json([
            'message' => 'Failed to update task.',
        ], 500);
    }

    public function destroy($id)
    {
        // Find the task by ID. If not found, it will automatically return a 404 error.
        $task = Task::findOrFail($id);

        // Delete the task from the database.
        $task->delete();

        // Return a response with status 204 (No Content), indicating that the task was deleted successfully
        // and no additional content is returned.
        return response()->json([
            'message' => 'Task deleted successfully',
        ], 204);
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Find the task by ID or return a 404 error if not found
        $task = Task::findOrFail($id);

        // Update the task's title and description with the validated data
        $task->title = $validated['title'];
        $task->description = $validated['description'];

        // Save the updated task to the database
        if ($task->save()) {
            // Return the updated task and a 200 OK status if successful
            return response()->json(['task' => $task], 200);
        }

        // Return a 500 Internal Server Error if the task could not be saved
        return response()->json(['error' => 'Failed to update task'], 500);
    }
}
