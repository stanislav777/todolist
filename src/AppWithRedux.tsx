import React, {useCallback} from 'react';
import './App.css';
import Todolist from './Todolist';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {addTodolistAC, changeFilterAC, changeTodoListTitleAC, removeTodoListAC} from './reducers/tl-reducer';
import {addTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC} from './reducers/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './store';
import AddItemForm from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed'

type  TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}

export  type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type  TasksStateType = {
    [key: string]: Array<TaskPropsType>
}

function AppWithRedux() {
    // BLL
    // const todolistId1 = v1();
    // const toDoListId2 = v1();


    let todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // const [todoLists, dispatchToTodolists] = useReducer(toDoListReducer, [
    //     {id: todolistId1, title: 'What to learn', filter: 'all'},
    //     {id: toDoListId2, title: 'What to buy', filter: 'all'}
    // ])


    // const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    //     [todolistId1]: [
    //         {id: v1(), title: '87564678675', isDone: true},
    //         {id: v1(), title: 'JS', isDone: false},
    //         {id: v1(), title: 'Java', isDone: true},
    //         {id: v1(), title: 'PHP', isDone: true},
    //         {id: v1(), title: 'Piton', isDone: false},
    //         {id: v1(), title: 'JS', isDone: true},
    //         {id: v1(), title: 'PHP', isDone: false},
    //     ],
    //     [toDoListId2]: [
    //         {id: v1(), title: 'Milk', isDone: true},
    //         {id: v1(), title: 'Bear', isDone: false},
    //         {id: v1(), title: 'Meat', isDone: true},
    //         {id: v1(), title: 'Eggs', isDone: true},
    //     ]
    // })

    //для листа
    const removeTodoList = useCallback ((id: string) => {
        let action = removeTodoListAC(id)
        dispatch(action)
    }, [])

    const addTodoList = useCallback ((title: string) => {
        dispatch(addTodolistAC(title))
    }, [])

    const changeTodoListTitle = useCallback ((title: string, todolistID: string) => {
        dispatch(changeTodoListTitleAC(title, todolistID))
    }, [])

    const changeFilter = useCallback ((newFilterValue: FilterValuesType, id: string) => {

        dispatch(changeFilterAC(id, newFilterValue))
    }, [])

    //для тасак
    const addTask = useCallback ((title: string, todolistID: string) => {
        dispatch(addTaskAC(title, todolistID))
    }, [])

    const removeTask = useCallback ((id: string, todolistID: string) => {
        let action = removeTaskAC(id, todolistID)
        dispatch(action)
    }, [])

    const changeStatus = useCallback ((taskId: string, isDone: boolean, todolistID: string) => {
        dispatch(changeStatusAC(taskId, isDone, todolistID))
    }, [])

    const changeTaskTitle = useCallback ((taskId: string, title: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todolistID))
    }, [])


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>

                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>

                <Grid container spacing={6}>
                    {
                        todolists.map(tl => {
                            let taskForTodoList = tasks[tl.id]

                            return <Grid item key={tl.id}>
                                <Paper elevation={10} style={{padding: '20px'}}>
                                    <Todolist
                                        title={tl.title}
                                        todolistID={tl.id}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        tasks={taskForTodoList}
                                        changeFilter={changeFilter}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>

                        })
                    }
                </Grid>
            </Container>
        </div>
    )
}


export default AppWithRedux;