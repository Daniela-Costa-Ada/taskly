import React, { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { title, description, is_completed: isCompleted };

    axios.post("/api/tasks", newTask)
      .then(response => {
        onTaskCreated(response.data.task);
        setTitle("");
        setDescription("");
        setIsCompleted(0);
      })
      .catch(error => console.error("There was an error creating the task!", error));
  };

  return (
    <div>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Status</label>
          <select value={isCompleted} onChange={(e) => setIsCompleted(Number(e.target.value))}>
            <option value={0}>Incomplete</option>
            <option value={1}>Completed</option>
          </select>
        </div>
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
