<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ToDoListSeeder extends Seeder
{
    public function run()
    {
        DB::table('tasks')->insert([
            ['title' => 'Estudar Laravel', 'description' => 'Estudar os fundamentos do framework Laravel'],
            ['title' => 'Finalizar projeto React', 'description' => 'Completar a última funcionalidade do projeto em React'],
            ['title' => 'Revisar pull requests', 'description' => 'Revisar o código enviado pela equipe'],
            ['title' => 'Planejar backlog da semana', 'description' => 'Definir as tarefas para a próxima semana'],
            ['title' => 'Implementar autenticação', 'description' => 'Adicionar sistema de login e cadastro'],
            ['title' => 'Testar API REST', 'description' => 'Realizar testes na API para verificar endpoints'],
            ['title' => 'Organizar arquivos do projeto', 'description' => 'Reestruturar pastas e arquivos do projeto'],
        ]);
    }
}
