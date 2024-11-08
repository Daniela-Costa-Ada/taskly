// src/components/TaskList.js
import React, { useEffect, useState } from 'react';

// TaskList component displays and manages the list of tasks
const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');

    // Fetch tasks from the API when the component mounts
    useEffect(() => {
        fetchTasks();
    }, []);

    // Function to fetch tasks from the server
    const fetchTasks = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/tasks');
            if (!response.ok) throw new Error('Failed to fetch tasks');
            const data = await response.json();

            // Sort tasks with incomplete ones first
            const sortedTasks = data.tasks.sort((a, b) => a.is_completed - b.is_completed);
            setTasks(sortedTasks);
        } catch (error) {
            setError('Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    // Function to update the status of a specific task
    const toggleTaskStatus = async (taskId, currentStatus) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ is_completed: currentStatus ? 0 : 1 }),
            });
            if (!response.ok) throw new Error('Failed to update task status');

            // Update the task status locally and re-sort tasks
            const updatedTasks = tasks.map(task =>
                task.id === taskId ? { ...task, is_completed: !currentStatus } : task
            ).sort((a, b) => a.is_completed - b.is_completed);

            setTasks(updatedTasks);
        } catch (error) {
            setError('Failed to update task status');
        }
    };

    // Function to delete a task by its ID
    const deleteTask = async (taskId) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete task');

            // Remove the task from the list locally
            const updatedTasks = tasks.filter(task => task.id !== taskId);
            setTasks(updatedTasks);
        } catch (error) {
            setError('Failed to delete task');
        }
    };

    // Function to enable editing mode for a task
    const startEditingTask = (task) => {
        setEditingTask(task.id);
        setEditTitle(task.title);
        setEditDescription(task.description);
    };

    // Function to update the task with new title and description
   const updateTask = async () => {
    try {
        const response = await fetch(`/api/tasks/${editingTask}`, {
            method: 'PUT',  // Usando PUT para a atualização
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                title: editTitle, 
                description: editDescription 
            }),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.error('Failed to update task:', errorMessage);
            throw new Error('Failed to update task');
        }

        const updatedTask = await response.json();  // Aguarda o retorno da tarefa atualizada

        // Atualiza a lista de tarefas com a tarefa editada
        const updatedTasks = tasks.map(task =>
            task.id === editingTask ? updatedTask.task : task
        );

        setTasks(updatedTasks);
        setEditingTask(null);  // Limpa o estado de edição
    } catch (error) {
        setError('Failed to update task');
        console.error(error);
    }
};


    // Render loading message, error message, or task list
    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id} style={{ marginBottom: '10px' }}>
                        {editingTask === task.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Edit title"
                                />
                                <input
                                    type="text"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    placeholder="Edit description"
                                />
                                <button onClick={updateTask}>Save</button>
                                <button onClick={() => setEditingTask(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <span>{task.title}</span>
                                <span style={{ marginLeft: '10px' }}>
                                    {task.is_completed ? 'Completed' : 'Incomplete'}
                                </span>
                                <button
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => toggleTaskStatus(task.id, task.is_completed)}
                                >
                                    Mark as {task.is_completed ? 'Incomplete' : 'Completed'}
                                </button>
                                <button
                                    style={{ marginLeft: '10px', color: 'blue' }}
                                    onClick={() => startEditingTask(task)}
                                >
                                    Edit
                                </button>
                                <button
                                    style={{ marginLeft: '10px', color: 'red' }}
                                    onClick={() => deleteTask(task.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
