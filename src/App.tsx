import React, {useState} from "react";
import "./App.css";
import Todolist from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: false},
        {id: v1(), title: "Java", isDone: true},
        {id: v1(), title: "PHP", isDone: true},
        {id: v1(), title: "Piton", isDone: false},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "PHP", isDone: false},
    ]);

    function removeTask(id: string) {
        let filteredtasks = tasks.filter(t => t.id !== id)
        setTasks(filteredtasks);
    }

    function changeFilter(value: "all" | "active" | "completed") {
        return setFilter(value);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks);

    }

    function changeStatus( taskId: string, isDone: boolean) {
       let task = tasks.find(t =>t.id === taskId);
       if(task) {
           task.isDone = isDone;
       }
       let copy =[...tasks]
       setTasks(copy);
    }

    let [filter, setFilter] = useState<"all" | "active" | "completed">("all")
    let taskForToDoList = tasks;
    if (filter === "active") {
        taskForToDoList = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        taskForToDoList = tasks.filter(t => t.isDone);
    }


    return (
        <div className="App">
            <Todolist
                addTask={addTask}
                removeTask={removeTask}
                title="What to learn"
                tasks={taskForToDoList}
                changeFilter={changeFilter}
                changeTaskStatus = {changeStatus}
                filter = {filter}
            />

        </div>
    )
}

export default App;