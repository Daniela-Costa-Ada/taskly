<?php

namespace Tests\Feature;

use App\Models\Task; // Importing the Task model to interact with the tasks table for tests
use Tests\TestCase; // Importing the TestCase class to extend for writing feature tests

class TaskControllerTest extends TestCase
{
    /**
     * Tests the creation of a task via the API.
     */
    public function test_task_creation_integration()
    {
        // Defining the task data to be sent with the POST request
        $taskData = [
            'title' => 'Tarefa de Unidade',
            'description' => 'uma nova descrição para teste',
        ];

        // Sending a POST request to create a new task in the API
        $response = $this->postJson('/api/tasks', $taskData);

        // Asserting that the response status code is 201 (Created)
        $response->assertStatus(201);

        // Asserting that the returned JSON contains the correct task data
        $response->assertJson([
            'task' => [
                'title' => $taskData['title'],
                'description' => $taskData['description'],
            ],
        ]);

        // Verifying that the task has been saved in the database
        $this->assertDatabaseHas('tasks', [
            'title' => $taskData['title'],
            'description' => $taskData['description'],
        ]);
    }

    /**
     * Tests updating a task via the API.
     */
    public function test_task_update()
    {
        // Creating a task in the database for updating
        $task = Task::create([
            'title' => 'Tarefa Original',
            'description' => 'Descrição original',
        ]);

        // Defining the updated data for the task
        $updatedData = [
            'title' => 'Tarefa Atualizada',
            'description' => 'Descrição atualizada',
        ];

        // Sending a PUT request to update the task data in the API
        $response = $this->putJson('/api/tasks/' . $task->id, $updatedData);

        // Asserting that the response status code is 200 (OK)
        $response->assertStatus(200);

        // Asserting that the returned JSON contains the updated task data
        $response->assertJson([
            'task' => $updatedData,
        ]);

        // Verifying that the updated data is saved in the database
        $this->assertDatabaseHas('tasks', $updatedData);
    }

    /**
     * Tests validation when creating a task (checks for required fields).
     */
    public function test_task_creation_validation()
    {
        // Sending a POST request without the required task data
        $response = $this->postJson('/api/tasks', []);

        // Asserting that the response status code is 422 (Unprocessable Entity)
        $response->assertStatus(422);

        // Asserting that the validation error is triggered for the 'title' field
        $response->assertJsonValidationErrors(['title']);
    }

    /**
     * Tests listing tasks after creating a new one.
     */
    public function test_task_list_after_creation()
    {
        // Defining data for a new task
        $taskData = [
            'title' => 'Tarefa para Listagem',
            'description' => 'Descrição da tarefa para teste de listagem',
        ];

        // Creating the task in the database
        $this->postJson('/api/tasks', $taskData);

        // Sending a GET request to list all tasks
        $response = $this->getJson('/api/tasks');

        // Asserting that the response status code is 200 (OK)
        $response->assertStatus(200);

        // Verifying that the created task appears in the returned list
        $response->assertJsonFragment([
            'title' => $taskData['title'],
            'description' => $taskData['description'],
        ]);

        // Verifying that the task exists in the database
        $this->assertDatabaseHas('tasks', [
            'title' => $taskData['title'],
            'description' => $taskData['description'],
        ]);
    }
}
