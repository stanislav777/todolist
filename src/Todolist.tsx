import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


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

}

function Todolist(props: TodolistPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim())
            setTitle("")
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            addTask()
        }
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
                <h3>{props.title}</h3>
                <div>
                    <input value={title}
                           onChange={onChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? "error" : ""}
                    />
                    <button onClick={addTask}>+</button>
                    {error && <div className="error-message">{error}</div>}
                </div>

                <ul>
                    {
                        props.tasks.map(t => {
                                const onClickRemoveTask = () => {
                                    props.removeTask(t.id)
                                }
                                const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                    props.changeTaskStatus(t.id, e.currentTarget.checked)
                                };

                                return <li className={t.isDone ? "is-done" : ""  }><input  type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                                    <span>{t.title} </span>
                                    <button onClick={onClickRemoveTask}> х
                                    </button>
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

