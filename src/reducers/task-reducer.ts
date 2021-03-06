import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListActionType} from './tl-reducer';


export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}

export type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}

export type changeStatusActionType = {
    type: 'CHANGE-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}

export type changeTaskTitleAC = {
    type: 'CHANGE-TITLE'
    taskId: string
    title: string
    todolistId: string
}


export type ActionType =
    RemoveTaskActionType
    | addTaskActionType
    | changeStatusActionType
    | changeTaskTitleAC
    | AddTodoListActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            let copyState = {...state}
            let todoListTasks = state[action.todolistId]
            copyState[action.todolistId] = todoListTasks.filter(t => t.id !== action.taskId)
            return copyState
        }
        case 'ADD-TASK': {
            let copyState = {...state}
            const newTask = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            let todoListTasks = copyState[action.todolistId]
            copyState[action.todolistId] = [newTask, ...todoListTasks]

            return copyState;
        }

        case 'CHANGE-STATUS': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]

            const task = todoListTasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone;
            }

            return copyState;
        }

        case 'CHANGE-TITLE': {
            let copyState = {...state}
            let todoListTasks = copyState[action.todolistId]

            const task = todoListTasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.title;
            }

            return copyState;
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }

        default :
            throw new Error('I don`t understand this tipe')
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
}

export const addTaskAC = (title: string, todolistId: string): addTaskActionType => {
    return {type: 'ADD-TASK', title, todolistId}
}

export const changeStatusAC = (taskId: string, isDone: boolean, todolistId: string): changeStatusActionType => {
    return {type: 'CHANGE-STATUS', taskId, isDone, todolistId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleAC => {
    return {type: 'CHANGE-TITLE', taskId, title, todolistId}
}