import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";


type  TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistID: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistID: string) => void
    changeTodoListTitle: (title: string, todolistID: string) => void
}

function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const all = () => {
        props.changeFilter("all", props.id)
    }
    const active = () => {
        props.changeFilter("active", props.id)
    }
    const completed = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={props.title} changeItem={changeTodoListTitle}/>
                    <IconButton onClick={removeTodoList}>
                        <Delete/>
                    </IconButton>
                    {/*<button onClick={() => props.removeTodoList(props.id)}>X</button>*/}
                </h3>

                <AddItemForm addItem={addTask}/>

                <ul style={{listStyle: "none", paddingLeft: "0"}} >
                    {
                        props.tasks.map(t => {
                                const removeTask = () => {
                                    props.removeTask(t.id, props.id)
                                }
                                const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                                };

                                const changeTitle = (title: string) => {
                                    props.changeTaskTitle(t.id, title, props.id)
                                }


                                return (
                                    <li key={t.id} className={t.isDone ? "is-done" : ""}>
                                        <Checkbox color={"primary"} checked={t.isDone} onChange={changeStatus}/>
                                        {/*<input type="checkbox" onChange={changeStatus} checked={t.isDone}/>*/}
                                        <EditableSpan title={t.title} changeItem={changeTitle}/>
                                        <IconButton onClick={removeTask}>
                                            <Delete/>
                                        </IconButton>
                                        {/*<button onClick={removeTask}> х</button>*/}
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
                <div>
                    <Button color={props.filter === "all" ? "secondary" : "primary"} variant="contained" size="small"
                            onClick={all}>All
                    </Button>
                    <Button color={props.filter === "active" ? "secondary" : "primary"} variant="contained" size="small"
                            onClick={active}>Active
                    </Button>
                    <Button color={props.filter === "completed" ? "secondary" : "primary"} variant="contained"
                            size="small"
                            onClick={completed}>Completed
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;

