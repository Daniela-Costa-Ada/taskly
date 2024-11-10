import React from "react";
import ReactDOM from "react-dom";
import TaskList from "./components/TaskList";
import GitHubSearch from './GitHubSearch'; 

const App = () => {
    const [tasks, setTasks] = React.useState([]);
    return (
        <div> 
            <TaskList tasks={tasks} />
            <GitHubSearch />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
