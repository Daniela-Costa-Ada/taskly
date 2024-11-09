import React from "react";
import ReactDOM from "react-dom";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import GitHubSearch from './GitHubSearch'; 

const App = () => {
    const [tasks, setTasks] = React.useState([]);

    const handleTaskCreated = (task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    return (
        <div>           
            {/* <TaskForm onTaskCreated={handleTaskCreated} /> */}
            <TaskList tasks={tasks} />
            <GitHubSearch />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
