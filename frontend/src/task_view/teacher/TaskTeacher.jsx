/**
 * @author Erikas Nakonecnikovas
 */
import React from 'react'
import TaskTitleTeacher from "./TaskTitleTeacher";
import TaskDeadlineTeacher from "./TaskDeadlineTeacher";
import TaskDescTeacher from "./TaskDescTeacher";
import TaskTeacher from "./TaskTeacher";

/**
 * The component takes in all task data and the array of objects of all tasks for the
 * course as props and renders the task components to display the information to the teacher.
 * The component calls itself recursively provided that the current task has a subtask.
 */

export default (props)=> {
    const task = props.task;
    const tasksArr = props.tasks;

    return(
        <div key={task.taskID}>
            <div className="taskContent">
                <TaskTitleTeacher taskTitle={task.taskTitle}/>
                <TaskDeadlineTeacher taskDeadline={task.deadline}/>
                <TaskDescTeacher taskDesc={task.desc}/>
            </div>
            {task.hasSubtask ? tasksArr.map(subtask => {
                if(subtask.parentTaskID === task.taskID){
                    return (
                        <div className="task-row-subtask" key={subtask.taskID}>
                            <TaskTeacher task={subtask} tasks={tasksArr}/>
                        </div>
                    )
                }
            }):""}
        </div>
    )
}