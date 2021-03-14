import {v1} from 'uuid';
import {TodoListType} from '../App';
import {addTodolistAC, toDoListReducer} from './tl-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodoListType>

beforeEach(() => {
     todolistId1 = v1();
     todolistId2 = v1();

     startState = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = toDoListReducer(startState, {type: 'REMOVE-TODOLIST', id: todolistId1})

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    let newTodolistTitle = 'New Todolist';

    let action = addTodolistAC(newTodolistTitle)
    const endState = toDoListReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});




