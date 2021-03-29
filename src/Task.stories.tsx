import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {Task, TaskPropType} from './Task';
import {action} from '@storybook/addon-actions';

export default {
    title: 'TODOLISTS/Task',
    component: Task,

} as Meta;


let removeTask = action('remove Task')
let changeTaskStatus = action('change Task Status ')
let changeTaskTitle = action('change Task Title')

const Template: Story<TaskPropType> = (args) => <Task {...args} />;

let baseArgs = {
    removeTask,
    changeTaskStatus,
    changeTaskTitle
}


export const TaskIsDoneStories = Template.bind({});
TaskIsDoneStories.args = {
 ...baseArgs,
    todolistID:'todolistID',
    task: {id:'1', title: 'React', isDone: true}
};

export const TaskIsNotDoneStories = Template.bind({});
TaskIsNotDoneStories.args = {
    ...baseArgs,
    todolistID:'todolistID',
    task: {id:'1', title: 'React', isDone: true}
};
