import React, {ChangeEvent, useCallback} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType} from './AppWithRedux';
import {Task} from './Task';


export type  TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistID: string
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

const Todolist = React.memo(function (props: TodolistPropsType) {
    console.log('todolist change')
    const addTask = useCallback( (title: string) => {
        props.addTask(title, props.todolistID)
    }, [props.addTask,props.todolistID]);

    const all = useCallback( () => {
        props.changeFilter("all", props.todolistID)
    },[props.changeFilter,props.todolistID])

    const active = useCallback( () => {
        props.changeFilter("active", props.todolistID)
    },[props.changeFilter,props.todolistID])

    const completed = useCallback( () => {
        props.changeFilter("completed", props.todolistID)
    },[props.changeFilter,props.todolistID])

    const removeTodoList = () => {
        props.removeTodoList(props.todolistID)
    }

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todolistID)

    let taskForTodoList = props.tasks;
    if (props.filter === 'active') {
        taskForTodoList = props.tasks.filter(t => t.isDone === false)
    };
    if (props.filter === 'completed') {
        taskForTodoList = props.tasks.filter(t => t.isDone === true)
    };

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
                        taskForTodoList.map(t => {

                                return <Task task={t}
                                             key={t.id}
                                             removeTask={props.removeTask}
                                             changeTaskTitle={props.changeTaskTitle}
                                             changeTaskStatus={props.changeTaskStatus}
                                             todolistID={props.todolistID}
                                />
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
});

export default Todolist;

