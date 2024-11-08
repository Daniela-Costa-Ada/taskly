```markdown
# To-Do List API

Esta é uma aplicação Laravel integrada ao React que funciona como uma API RESTful para gerenciar uma lista de tarefas (to-do list). A API permite criar e listar tarefas com filtros.

## Requisitos

- PHP >= 8.0
- Composer
- Banco de Dados (MySQL, PostgreSQL, etc.)
- Laravel
- React

## Instalação

1. Clone o repositório e acesse o diretório do projeto:
   ```bash
   git clone git@github.com:Daniela-Costa-Ada/Aiogroup.git
   cd seu-repositorio
   ```

2. Instale as dependências do Laravel:
   ```bash
   composer install
   ```

3. Configure o arquivo `.env`:
   - Crie uma cópia do arquivo `.env.example`:
     ```bash
     cp .env.example .env
     ```
   - Configure os detalhes do banco de dados no arquivo `.env`:
     ```plaintext
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=todo_list
     DB_USERNAME=seu_usuario
     DB_PASSWORD=sua_senha
     ```

4. Gere a chave da aplicação:
   ```bash
   php artisan key:generate
   ```

5. Execute as migrações para criar as tabelas no banco de dados:
   ```bash
   php artisan migrate
   ```

6. Inicie o servidor:
   ```bash
   php artisan serve
   ```

## Endpoints da API

### 1. Criar Tarefa

- **Descrição:** Cria uma nova tarefa na lista.
- **Método:** `POST`
- **Endpoint:** `/api/tasks`
- **Exemplo de Requisição:**
  ```json
  {
      "title": "Nova Tarefa",
      "description": "Descrição da tarefa"
  }
  ```
- **Resposta de Sucesso:** `201 Created`
  ```json
  {
      "task": {
          "id": 1,
          "title": "Nova Tarefa",
          "description": "Descrição da tarefa",
          "is_completed": false,
          "created_at": "2024-11-06T10:00:00.000000Z",
          "updated_at": "2024-11-06T10:00:00.000000Z"
      }
  }
  ```

### 2. Listar Tarefas

- **Descrição:** Lista todas as tarefas, com filtro opcional por status (completa/não completa).
- **Método:** `GET`
- **Endpoint:** `/api/tasks`
- **Parâmetro de Filtro:** `is_completed` (opcional)
  - `true` para listar apenas tarefas completas
  - `false` para listar apenas tarefas não completas

- **Exemplo de Requisição Sem Filtro:**
  ```http
  GET /api/tasks
  ```
  
- **Exemplo de Requisição com Filtro (Tarefas Completas):**
  ```http
  GET /api/tasks?is_completed=true
  ```

- **Resposta de Sucesso:**
  ```json
  {
      "tasks": [
          {
              "id": 1,
              "title": "Tarefa Exemplo",
              "description": "Descrição da tarefa",
              "is_completed": true,
              "created_at": "2024-11-06T10:00:00.000000Z",
              "updated_at": "2024-11-06T10:00:00.000000Z"
          }
      ]
  }
  ```

## Tecnologias Utilizadas

- [Laravel](https://laravel.com/) - Framework PHP para desenvolvimento web

## Licença

Este projeto está licenciado sob a [MIT License](https://opensource.org/licenses/MIT).
```
