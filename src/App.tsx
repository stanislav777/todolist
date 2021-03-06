import React, {useState} from 'react';
import './App.css';
import Todolist from './Todolist';
import {v1} from 'uuid';
import AddItemForm from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

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

function App() {
    // BLL
    const toDoListID1 = v1();
    const toDoListID2 = v1();

    const [todoLists, setTodolist] = useState<Array<TodoListType>>([
        {id: toDoListID1, title: 'What to learn', filter: 'all'},
        {id: toDoListID2, title: 'What to buy', filter: 'all'}
    ])


    const [tasks, setTasks] = useState<TasksStateType>({
        [toDoListID1]: [
            {id: v1(), title: '87564678675', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'Java', isDone: true},
            {id: v1(), title: 'PHP', isDone: true},
            {id: v1(), title: 'Piton', isDone: false},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'PHP', isDone: false},
        ],
        [toDoListID2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bear', isDone: false},
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Eggs', isDone: true},
        ]
    })

    //для листа
    function removeTodoList(todolistID: string) {
        setTodolist(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID];
        setTasks({...tasks});
    }

    function addTodoList(title: string) {
        const newTodolistId = v1()
        const newTodolist: TodoListType = {
            id: newTodolistId,
            title: title,
            filter: 'all'
        }

        setTodolist([newTodolist, ...todoLists]);
        setTasks({...tasks, [newTodolistId]: []})
    }

    function changeTodoListTitle(title: string, todolistID: string) {
        const todoList = todoLists.find(t => t.id === todolistID)
        if (todoList) {
            todoList.title = title;
        }
        setTodolist([...todoLists])
    }

    function changeFilter(newFilterValue: FilterValuesType, todolistID: string) {
        const todoList = todoLists.find(t => t.id === todolistID)
        if (todoList) {
            todoList.filter = newFilterValue
            setTodolist([...todoLists])
        }
    }

    //для тасак
    function addTask(title: string, todolistID: string) {

        const newTask: TaskPropsType = {
            id: v1(),
            title: title,
            isDone: false
        }

        const todoListTasks = tasks[todolistID]
        tasks[todolistID] = [newTask, ...todoListTasks]
        setTasks({...tasks});

    }

    function removeTask(id: string, todolistID: string) {
        const todoListTasks = tasks[todolistID]
        tasks[todolistID] = todoListTasks.filter(t => t.id !== id)
        setTasks({...tasks});
    }

    function changeStatus(taskId: string, isDone: boolean, todolistID: string) {
        const todoListTasks = tasks[todolistID]

        const task: TaskPropsType | undefined = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }
        setTasks({...tasks});
    }

    function changeTaskTitle(taskId: string, title: string, todolistID: string) {
        const todoListTasks = tasks[todolistID]


        const task: TaskPropsType | undefined = todoListTasks.find(t => t.id === taskId);
        if (task) {
            task.title = title;
        }
        setTasks({...tasks});
    }


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
                        todoLists.map(tl => {
                            let taskForTodoList = tasks[tl.id]
                            if (tl.filter === 'active') {
                                taskForTodoList = tasks[tl.id].filter(t => t.isDone === false)
                            }
                            if (tl.filter === 'completed') {
                                taskForTodoList = tasks[tl.id].filter(t => t.isDone === true)
                            }
                            return <Grid item key={tl.id}>
                                <Paper elevation={10} style={{padding: '20px'}}>
                                    <Todolist
                                        title={tl.title}
                                        id={tl.id}
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


export default App;