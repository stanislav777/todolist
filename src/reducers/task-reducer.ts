import {TaskStateType} from '../App';


export type FirstActionType = {
    type: ""
}

export type SecondActionType = {
    type: ""
}



export type ActionType = FirstActionType | SecondActionType

export const toDoListReducer = (state: TaskStateType, action: ActionType ) =>{
    switch (action.type) {
        case '': ''
            return [...state]

        case "":
            return [...state]

        case "":
            return [...state]

        case "":
           return  state


        default :
           throw new Error( "I don`t understand this tipe")
    }
}

export  const  firstTaskAC = (): FirstActionType = > {
    return {type: ''}
}

export  const  secondTaskAC = (title: string): FirstActionType = > {
    return {type: ''}
}