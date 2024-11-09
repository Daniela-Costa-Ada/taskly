import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrashAlt, FaCheck, FaRegCircle } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      const sortedTasks = data.tasks.sort((a, b) => a.is_completed - b.is_completed);
      setTasks(sortedTasks);
    } catch (error) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask].sort((a, b) => a.is_completed - b.is_completed));
  };

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

  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete task');

      const updatedTasks = tasks.filter(task => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      setError('Failed to delete task');
    }
  };

  const startEditingTask = (task) => {
    setEditingTask(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const updateTask = async () => {
    try {
      const response = await fetch(`/api/tasks/${editingTask}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, description: editDescription }),
      });
      if (!response.ok) throw new Error('Failed to update task');

      const updatedTask = await response.json();
      const updatedTasks = tasks.map(task =>
        task.id === editingTask ? updatedTask.task : task
      );

      setTasks(updatedTasks);
      setEditingTask(null);
    } catch (error) {
      setError('Failed to update task');
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <h1 className="my-4">Task List</h1>
      <TaskForm addTask={addTask} /> {/* Passa a função addTask como prop */}
      <ul className="list-group">
        {tasks.map(task => (
          <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
            {editingTask === task.id ? (
              <div>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Edit title"
                  className="form-control mb-2"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Edit description"
                  className="form-control mb-2"
                />
                <button className="btn btn-success" onClick={updateTask}>Save</button>
                <button className="btn btn-secondary ms-2" onClick={() => setEditingTask(null)}>Cancel</button>
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{task.title}</h5>
                  <p>{task.description}</p>
                  <span className={`badge ${task.is_completed ? 'bg-success' : 'bg-warning'}`}>
                    {task.is_completed ? 'Completed' : 'Incomplete'}
                  </span>
                </div>
                <div>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={() => toggleTaskStatus(task.id, task.is_completed)}
                  >
                    {task.is_completed ? <FaRegCircle /> : <FaCheck />}
                  </button>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={() => startEditingTask(task)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => deleteTask(task.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
