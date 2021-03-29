import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton} from '@material-ui/core';
import EditableSpan from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskPropsType} from './Todolist';

export type TaskPropType = {
    task: TaskPropsType
    todolistID: string
    removeTask: (id: string, todolistID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskId: string, title: string, todolistID: string) => void
}

export const Task = React.memo((props: TaskPropType) => {

    const removeTask = () => {
        props.removeTask(props.task.id, props.todolistID)
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistID)
    };

    const changeTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistID)
    }

    return (
        <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox color={'primary'} checked={props.task.isDone} onChange={changeStatus}/>
            <EditableSpan title={props.task.title} changeItem={changeTitle}/>
            <IconButton onClick={removeTask}>
                <Delete/>
            </IconButton>
        </li>

    )
})