import {v1} from "uuid";
import {TodoListType} from "../App";
import {addTodolistAC, toDoListReducer} from "./tl-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = toDoListReducer(startState, { type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";


    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let action = addTodolistAC ( "ghghhgh")
    const endState = toDoListReducer(startState, action)



    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});




