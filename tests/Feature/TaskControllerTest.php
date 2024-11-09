<?php

namespace Tests\Feature;

use App\Models\Task;
use Tests\TestCase;

class TaskControllerTest extends TestCase
{
    /**
     * Testa a criação de uma tarefa via API.
     */
    public function test_task_creation_integration()
    {
        $taskData = [
            'title' => 'Tarefa de Integração',
            'description' => 'uma nova descrição para teste',
        ];

        // Realiza a requisição para a API de criação
        $response = $this->postJson('/api/tasks', $taskData);

        // Valida a resposta da API teste de unidade
        $response->assertStatus(201);
        $response->assertJson([
            'task' => [
                'title' => 'Tarefa de Integração',
                'description' => 'uma nova descrição para teste',
            ],
        ]);

        // Verifica se a tarefa foi inserida no banco de dados
        $this->assertDatabaseHas('tasks', [
            'title' => 'Tarefa de Integração',
            'description' => 'uma nova descrição para teste',
        ]);
    }

    /**
     * Testa a atualização de uma tarefa via API.
     */
    public function test_task_update()
    {
        $task = Task::create([
            'title' => 'Tarefa Original',
            'description' => 'Descrição original',
        ]);

        $updatedData = [
            'title' => 'Tarefa Atualizada',
            'description' => 'Descrição atualizada',
        ];

        $response = $this->putJson('/api/tasks/' . $task->id, $updatedData);

        $response->assertStatus(200);
        $response->assertJson([
            'task' => $updatedData,
        ]);

        // Verifica se os dados atualizados estão no banco
        $this->assertDatabaseHas('tasks', $updatedData);
    }

    /**
     * Testa a validação de criação de tarefa (verifica campo obrigatório).
     */
    public function test_task_creation_validation()
    {
        $response = $this->postJson('/api/tasks', []);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['title']);
    }

    /**
     * Testa a listagem de tarefas após a criação de uma nova.
     */
    public function test_task_list_after_creation()
    {
        // Cria uma nova tarefa no banco de dados
        $taskData = [
            'title' => 'Tarefa para Listagem',
            'description' => 'Descrição da tarefa para teste de listagem',
        ];

        $this->postJson('/api/tasks', $taskData); // Realiza a requisição para criar a tarefa

        // Realiza a requisição para listar todas as tarefas
        $response = $this->getJson('/api/tasks');

        // Verifica se a resposta da API tem status 200
        $response->assertStatus(200);

        // Verifica se a tarefa criada está na lista retornada
        $response->assertJsonFragment([
            'title' => 'Tarefa para Listagem',
            'description' => 'Descrição da tarefa para teste de listagem',
        ]);

        // Verifica se a tarefa foi salva no banco de dados
        $this->assertDatabaseHas('tasks', [
            'title' => 'Tarefa para Listagem',
            'description' => 'Descrição da tarefa para teste de listagem',
        ]);
    }
}
