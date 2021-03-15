import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../AppWithRedux';


export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}

type ChangeFilterActionType = {
    type: 'CHANGE-FILTER'
    newFilterValue: FilterValuesType
    id: string
}

type ChangeTodoListTitle = {
    type: 'CHANGE-TITLE'
    title: string
    id: string
}

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeFilterActionType | ChangeTodoListTitle

let initialState:Array<TodoListType> = []

export const toDoListReducer = (state= initialState, action: ActionType) => {
    switch (action.type) {
        case 'ADD-TODOLIST': {
            const newTodolistId = action.todolistId
            const newTodolist: TodoListType = {
                id: newTodolistId,
                title: action.title,
                filter: 'all'
            }
            return [newTodolist, ...state]
        }
        case 'CHANGE-FILTER': {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.filter = action.newFilterValue
                return [...state]
            }
            return [...state]
        }
        case 'CHANGE-TITLE': {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return [...state]
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)

        }
        default :
            return state
    }
}

export const addTodolistAC = ( title: string): AddTodoListActionType =>
{
    return {type: 'ADD-TODOLIST',  title, todolistId: v1()}
}

export const changeFilterAC = (  id: string, newFilterValue: FilterValuesType): ChangeFilterActionType =>
{
    return {type: 'CHANGE-FILTER',  id , newFilterValue}
}

export const changeTodoListTitleAC = ( title: string, id:string): ChangeTodoListTitle =>
{
    return {type: 'CHANGE-TITLE', title, id}
}

export const removeTodoListAC = ( id: string): RemoveTodoListActionType =>
{
    return {type: 'REMOVE-TODOLIST', id}
}