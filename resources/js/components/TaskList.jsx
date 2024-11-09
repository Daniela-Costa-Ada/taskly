import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaCheck, FaRegCircle, FaPlus } from 'react-icons/fa'; // Icons for task actions
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './TaskForm'; // Importing the task form for editing and creation

// Main component for the task list
const TaskList = () => {
  // State variables for tasks, loading status, error message, task being edited, and form visibility
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Effect to load tasks when the component is mounted
  useEffect(() => {
    fetchTasks();
  }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      // Sorting tasks by their completion status (incomplete tasks first)
      const sortedTasks = data.tasks.sort((a, b) => a.is_completed - b.is_completed);
      setTasks(sortedTasks);
    } catch (error) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Function to toggle the completion status of a task (complete/incomplete)
  const toggleTaskStatus = async (taskId, currentStatus) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_completed: currentStatus ? 0 : 1 }),
      });
      if (!response.ok) throw new Error('Failed to update task status');
      const updatedTasks = tasks.map(task =>
        task.id === taskId ? { ...task, is_completed: !currentStatus } : task
      ).sort((a, b) => a.is_completed - b.is_completed);
      setTasks(updatedTasks);
    } catch (error) {
      setError('Failed to update task status');
    }
  };

  // Function to delete a task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  // Function to start editing a task
  const startEditingTask = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  // Function to save a task (new or edited)
  const saveTask = async (task) => {
    try {
      const method = editingTask ? 'PUT' : 'POST'; // Use PUT for editing, POST for new task
      const url = editingTask
        ? `/api/tasks/${editingTask.id}`
        : '/api/tasks';

      const response = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
        }),
      });

      if (!response.ok) throw new Error('Failed to save task');

      const newTask = await response.json();

      if (editingTask) {
        const updatedTasks = tasks.map((t) => (t.id === editingTask.id ? newTask.task : t));
        setTasks(updatedTasks);
      } else {
        setTasks((prevTasks) => [newTask.task, ...prevTasks]);
      }

      setShowForm(false); // Hide the form after saving
      setEditingTask(null); // Clear the editing task state
    } catch (error) {
      setError('Failed to save task');
    }
  };

  // Function to cancel editing
  const cancelEdit = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  // Display loading and error messages
  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1 className="my-4">To Do List</h1>
      {!showForm && (
        <button
          className="btn btn-outline-primary ms-2 mb-3" // Adiciona margem abaixo para separar da lista de tarefas
          onClick={() => setShowForm(true)}
        >
          <FaPlus /> New Task
        </button>
      )}
      {/* Render task list when not in form view */}
      {!showForm && (
        <ul className="list-group">
          {tasks.map((task) => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
                <span className={`badge ${task.is_completed ? 'bg-success' : 'bg-warning'}`}>
                  {task.is_completed ? 'Completed' : 'Incomplete'}
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-start">
               
                {/* Button to toggle task status */}
                <button
                  className="btn btn-outline-primary ms-2"
                  onClick={() => toggleTaskStatus(task.id, task.is_completed)}
                >
                  {task.is_completed ? <FaRegCircle /> : <FaCheck />}
                </button>

                {/* Button to edit task */}
                <button
                  className="btn btn-outline-secondary ms-2"
                  onClick={() => startEditingTask(task)}
                >
                  <FaEdit />
                </button>

                {/* Button to delete task */}
                <button
                  className="btn btn-outline-danger ms-2"
                  onClick={() => deleteTask(task.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>

            </li>
          ))}
        </ul>
      )}

      {/* Show task form if showForm is true */}
      {showForm && (
        <TaskForm
          taskToEdit={editingTask} // Pass the task being edited to the form
          onSave={saveTask} // Save task function
          onCancel={cancelEdit} // Cancel edit function
        />
      )}
    </div>
  );
};

export default TaskList;
