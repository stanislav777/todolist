import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type AddTodoListActionType = {
    type: "ADD-TODOLIST",
    title: string
}

type ChangeFilterActionType = {
    type: "CHANGE-FILTER",
    filter: FilterValuesType
    id: string
}

type ChangeTodoListTitle = {
    type: "CHANGE-TITLE",
    title: string
    id: string
}

type RemoveTodoListActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeFilterActionType| ChangeTodoListTitle

export const toDoListReducer = (state: Array<TodoListType>, action: ActionType ) =>{
    switch (action.type) {
        case "ADD-TODOLIST": {
            const newTodolistId = v1()
            const newTodolist: TodoListType = {
                id: newTodolistId,
                title: action.title,
                filter: "all"
            }
            return [newTodolist, ...state]
        }
        case "CHANGE-FILTER": {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.filter = action.filter
                return [...state]
            }
            return [...state]
        }
        case "CHANGE-TITLE": {
            const todoList = state.find(t => t.id === action.id)
            if (todoList) {
                todoList.title = action.title;
                return [...state]
            }
            return [...state]
        }
        case "REMOVE-TODOLIST": {
           return  state.filter(tl => tl.id !== action.id)

        }
        default :
            return  state
    }
}