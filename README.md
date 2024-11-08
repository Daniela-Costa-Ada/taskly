```markdown
# To-Do List API

This is a Laravel application integrated with React that functions as a RESTful API to manage a to-do list. The API allows creating, listing, updating, and deleting tasks, with support for filtering tasks based on their completion status using `0` (incomplete) and `1` (completed).

## Requirements

- PHP >= 8.0
- Composer
- Database (MySQL)
- Laravel
- React
- Apache Web Server
- Linux (for development environment)

## Installation

### Backend Setup (Laravel)

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

5. Run migrations to create the database tables:
   ```bash
   php artisan migrate
   ```

6. Start the Laravel server:
   ```bash
   php artisan serve
   ```

### Frontend Setup (React)

1. Navigate to the `resources/js` directory:
   ```bash
   cd resources/js
   ```

2. Install necessary dependencies with `npm`:
   ```bash
   npm install
   ```

3. Compile the React application using Laravel Mix:
   ```bash
   npm run dev
   ```

4. For production, use:
   ```bash
   npm run production
   ```

### Configure Laravel Mix (webpack.mix.js)
   - The `webpack.mix.js` file is configured to compile React files in the `resources/js` directory. Make sure you have this configuration:
   ```javascript
   const mix = require('laravel-mix');

   mix.react('resources/js/app.js', 'public/js')
      .sass('resources/sass/app.scss', 'public/css');
   ```

### React Configuration (package.json)

- Ensure that `package.json` has the necessary dependencies for React, including Babel for transpiling JSX:
  ```json
  {
    "name": "aiogroup",
    "version": "1.0.0",
    "private": true,
    "scripts": {
      "dev": "mix",
      "watch": "mix watch",
      "production": "mix --production"
    },
    "dependencies": {
      "axios": "^0.27.2",
      "react": "^18.2.0",
      "react-dom": "^18.2.0"
    },
    "devDependencies": {
      "babel-eslint": "^10.1.0",
      "babel-preset-react": "^6.24.1",
      "laravel-mix": "^6.0.49",
      "webpack": "^5.71.0"
    }
  }
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
      "description": "Task description",
      "is_completed": 1
  }
  ```
- **Success Response:** `201 Created`
  ```json
  {
      "task": {
          "id": 1,
          "title": "New Task",
          "description": "Task description",
          "is_completed": 0,
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
  - `1` to list only completed tasks
  - `0` to list only incomplete tasks

- **Request Example Without Filter:**
  ```http
  GET /api/tasks
  ```

- **Request Example With Filter (Completed Tasks):**
  ```http
  GET /api/tasks?is_completed=1
  ```

- **Success Response:**
  ```json
  {
      "tasks": [
          {
              "id": 1,
              "title": "Example Task",
              "description": "Task description",
              "is_completed": 1,
              "created_at": "2024-11-06T10:00:00.000000Z",
              "updated_at": "2024-11-06T10:00:00.000000Z"
          }
      ]
  }
  ```

### 3. Update Task Status

- **Description:** Updates the completion status of a task.
- **Method:** `PATCH`
- **Endpoint:** `/api/tasks/{id}/status`
- **Request Example:**
  ```json
  {
      "is_completed": 1
  }
  ```
- **Success Response:** `200 OK`
  ```json
  {
      "message": "Task updated successfully.",
      "task": {
          "id": 1,
          "title": "New Task",
          "description": "Task description",
          "is_completed": 1,
          "created_at": "2024-11-06T10:00:00.000000Z",
          "updated_at": "2024-11-06T10:00:00.000000Z"
      }
  }
  ```

- **Error Response (if task not found):** `404 Not Found`
  ```json
  {
      "message": "Task not found."
  }
  ```

### 4. Delete Task

- **Description:** Deletes a task from the list.
- **Method:** `DELETE`
- **Endpoint:** `/api/tasks/{id}`
- **Success Response:** `204 No Content`
  ```json
  {
      "message": "Task deleted successfully."
  }
  ```

## Frontend Features (React)

### Task List Features:

1. **Add Task:** 
   - A form to add new tasks. Sends a `POST` request to the API.
   
2. **List Tasks:**
   - Displays all tasks, with options to filter by `is_completed`. Tasks are fetched using a `GET` request.

3. **Mark Task as Complete/Incomplete:**
   - Users can toggle the task status between `complete` and `incomplete`. This sends a `PATCH` request to update the `is_completed` field.

4. **Delete Task:**
   - Each task can be deleted with a `DELETE` request.

**React Components:**

- `TaskList`: Displays a list of tasks with buttons to mark as complete/incomplete or delete them.
- `TaskForm`: A form to add new tasks to the list.

### Example of `app.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/AddTaskForm';

ReactDOM.render(
  <React.StrictMode>
    <TaskForm />
    <TaskList />
  </React.StrictMode>,
  document.getElementById('root')
);
```

### Technologies Used

- ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white) - PHP framework for web development
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) - JavaScript library for building user interfaces
- ![Composer](https://img.shields.io/badge/Composer-885630?style=for-the-badge&logo=composer&logoColor=white) - Dependency manager for PHP
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) - Database
- ![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white) - Backend programming language
- ![Apache](https://img.shields.io/badge/Apache-FF0000?style=for-the-badge&logo=apache&logoColor=white) - Web server
- ![Linux](https://img.shields.io/badge/Linux-000000?style=for-the-badge&logo=linux&logoColor=white) - Development environment

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
