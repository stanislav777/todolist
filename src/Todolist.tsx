import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";


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
    changeFilter: (value: FilterValuesType,todolistID: string) => void
    addTask: (title: string,todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    filter: FilterValuesType
    removeTodoList: (todolistID: string) =>void
}

function Todolist(props: TodolistPropsType) {

   const addTask = (title:string) => {
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


    return (
        <div className="App">
            <div>
                <h3>{props.title} <button onClick={()=> props.removeTodoList(props.id)}>X</button></h3>

              <AddItemForm addItem={addTask}/>

                <ul>
                    {
                        props.tasks.map(t => {
                                const onClickRemoveTask = () => {
                                    props.removeTask(t.id, props.id)
                                }
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                                };

                                return <li className={t.isDone ? "is-done" : ""  }><input  type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                                    <span>{t.title} </span>
                                    <button onClick={onClickRemoveTask}> х </button>
                                </li>
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

