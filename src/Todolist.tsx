import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";


type  TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
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
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
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
                            onClick={onAllClickHandler}>All
                    </button>
                    <button className={props.filter === "active" ? "active-filter" : ""}
                            onClick={onActiveClickHandler}>Active
                    </button>
                    <button className={props.filter === "completed" ? "active-filter" : ""}
                            onClick={onCompletedClickHandler}>Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Todolist;

// gfhfgfhhghgfffffhfhf