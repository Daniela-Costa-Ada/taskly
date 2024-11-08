import React from "react";
import ReactDOM from "react-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App = () => {
    const [tasks, setTasks] = React.useState([]);

    const handleTaskCreated = (task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <TaskForm onTaskCreated={handleTaskCreated} />
            <TaskList tasks={tasks} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
