import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";


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
    changeTaskTitle:(taskId: string, title: string, todolistID: string) => void
    changeTodoListTitle:(title: string, todolistID: string) =>void
}

function Todolist(props: TodolistPropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const All = () => {
        props.changeFilter("all", props.id)
    }
    const Active = () => {
        props.changeFilter("active", props.id)
    }
    const Completed = () => {
        props.changeFilter("completed", props.id)
    }

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)

    return (
        <div className="App">
            <div>
                <h3><EditableSpan title={props.title} changeItem={changeTodoListTitle}/>
                    <button onClick={() => props.removeTodoList(props.id)}>X</button>
                </h3>

                <AddItemForm addItem={addTask}/>

                <ul>
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
                                    <li className={t.isDone ? "is-done" : ""}>
                                        <input type="checkbox" onChange={changeStatus} checked={t.isDone}/>
                                        <EditableSpan title={t.title} changeItem={changeTitle}/>
                                        <button onClick={removeTask}> х</button>
                                    </li>
                                )
                            }
                        )
                    }
                </ul>
                <div>
                    <button className={props.filter === "all" ? "active-filter" : ""}
                            onClick={All}>All
                    </button>
                    <button className={props.filter === "active" ? "active-filter" : ""}
                            onClick={Active}>Active
                    </button>
                    <button className={props.filter === "completed" ? "active-filter" : ""}
                            onClick={Completed}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;

