import {v1} from 'uuid';
import {AddTodoListActionType, RemoveTodoListActionType} from './tl-reducer';
import {TasksStateType} from '../AppWithRedux';


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

export type changeTaskTitleACType = {
    type: 'CHANGE-Task-TITLE'
    taskId: string
    title: string
    todolistId: string
}


export type ActionType =
    RemoveTaskActionType
    | addTaskActionType
    | changeStatusActionType
    | changeTaskTitleACType
    | AddTodoListActionType
    | RemoveTodoListActionType

let initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionType) => {
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

            let todoListTasks = state[action.todolistId]

            const newTodoListTasks = todoListTasks.map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task );

            state[action.todolistId] = [...newTodoListTasks]
            return ({...state});
        }

        case 'CHANGE-Task-TITLE': {

            let todoListTasks = state[action.todolistId]

            const task = todoListTasks.find(task => task.id === action.taskId);
            if (task) {
                task.title = action.title;
            }
            state[action.todolistId] = [...todoListTasks]
            return ({...state});
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolistId]: []
            }
        }

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]

            return copyState
        }
        default :
            return state
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

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleACType => {
    return {type: 'CHANGE-Task-TITLE', taskId, title, todolistId}
}

export const removeTaskTitleAC = (taskId: string, title: string, todolistId: string): changeTaskTitleACType => {
    return {type: 'CHANGE-Task-TITLE', taskId, title, todolistId}
}

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {type: 'REMOVE-TODOLIST', id}
}