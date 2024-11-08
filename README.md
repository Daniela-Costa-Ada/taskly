```markdown
# To-Do List API

This is a Laravel application integrated with React that functions as a RESTful API to manage a to-do list. The API allows creating and listing tasks with filters.

## Requirements

- PHP >= 8.0
- Composer
- Database (MySQL, PostgreSQL, etc.)
- Laravel
- React

## Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone git@github.com:Daniela-Costa-Ada/Aiogroup.git
   cd your-repository
   ```

2. Install Laravel dependencies:
   ```bash
   composer install
   ```

3. Configure the `.env` file:
   - Create a copy of the `.env.example` file:
     ```bash
     cp .env.example .env
     ```
   - Set up the database details in the `.env` file:
     ```plaintext
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=todo_list
     DB_USERNAME=your_username
     DB_PASSWORD=your_password
     ```

4. Generate the application key:
   ```bash
   php artisan key:generate
   ```

5. Run migrations to create database tables:
   ```bash
   php artisan migrate
   ```

6. Start the server:
   ```bash
   php artisan serve
   ```

## API Endpoints

### 1. Create Task

- **Description:** Creates a new task in the list.
- **Method:** `POST`
- **Endpoint:** `/api/tasks`
- **Request Example:**
  ```json
  {
      "title": "New Task",
      "description": "Task description"
  }
  ```
- **Success Response:** `201 Created`
  ```json
  {
      "task": {
          "id": 1,
          "title": "New Task",
          "description": "Task description",
          "is_completed": false,
          "created_at": "2024-11-06T10:00:00.000000Z",
          "updated_at": "2024-11-06T10:00:00.000000Z"
      }
  }
  ```

### 2. List Tasks

- **Description:** Lists all tasks, with an optional status filter (completed/not completed).
- **Method:** `GET`
- **Endpoint:** `/api/tasks`
- **Filter Parameter:** `is_completed` (optional)
  - `true` to list only completed tasks
  - `false` to list only incomplete tasks

- **Request Example Without Filter:**
  ```http
  GET /api/tasks
  ```
  
- **Request Example With Filter (Completed Tasks):**
  ```http
  GET /api/tasks?is_completed=true
  ```

- **Success Response:**
  ```json
  {
      "tasks": [
          {
              "id": 1,
              "title": "Example Task",
              "description": "Task description",
              "is_completed": true,
              "created_at": "2024-11-06T10:00:00.000000Z",
              "updated_at": "2024-11-06T10:00:00.000000Z"
          }
      ]
  }
  ```

## Technologies Used

- ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white) - PHP framework for web development
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) - JavaScript library for building user interfaces
- ![Composer](https://img.shields.io/badge/Composer-885630?style=for-the-badge&logo=composer&logoColor=white) - Dependency manager for PHP
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) or ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white) - Database
- ![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white) - Backend programming language

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
```