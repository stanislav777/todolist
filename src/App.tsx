import React, {useState} from "react";
import "./App.css";
import Todolist from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = "all" | "active" | "completed"

type  TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type  TaskStateType = {
    [key: string] : Array<TaskPropsType>
}

function App() {
    // BLL
    const toDoListID1 = v1();
    const toDoListID2 = v1();
     const [todoLists, setTodolist] = useState<Array<TodoListType>>([
         {id: toDoListID1, title:'What to learn', filter: "all"},
         {id: toDoListID2, title:'What to buy', filter: "all"}
     ])


    const [tasks, setTasks] = useState<TaskStateType>({
        [toDoListID1] : [
            {id: v1(), title: "87564678675", isDone: true},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "Java", isDone: true},
            {id: v1(), title: "PHP", isDone: true},
            {id: v1(), title: "Piton", isDone: false},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "PHP", isDone: false},
        ],
        [toDoListID2] : [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bear", isDone: false},
            {id: v1(), title: "Meat", isDone: true},
            {id: v1(), title: "Eggs", isDone: true},
        ]

    })



    function removeTask(id: string, todolistID: string) {
         const todoListTasks = tasks[todolistID]
        tasks[todolistID] = todoListTasks.filter(t => t.id !== id)
        setTasks({...tasks});
    }

    function changeFilter(newFilterValue: FilterValuesType, todolistID: string) {
        const todoList = todoLists.find(t => t.id === todolistID)
        if(todoList){
            todoList.filter = newFilterValue
            setTodolist([...todoLists])
        }
    }

    function addTask(title: string,todolistID: string) {

        const newTask: TaskPropsType = {
            id: v1(),
            title: title,
            isDone: false}

        const todoListTasks = tasks[todolistID]
        tasks[todolistID] = [newTask, ...todoListTasks]
        setTasks({...tasks});

    }

    function changeStatus( taskId: string, isDone: boolean,todolistID: string) {
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