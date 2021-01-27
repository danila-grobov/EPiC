/**
 * @author Erikas Nakonecnikovas
 */
import React from 'react';
import TaskTitleStudent from "./TaskTitleStudent";
import TaskDeadlineStudent from "./TaskDeadlineStudent";
import TaskDescStudent from "./TaskDescStudent";
import TaskStudent from "./TaskStudent";

/**
 * The component takes in all task data and the array of objects of all tasks and tasks done for
 * the course as props and renders the task components to display the information to the student.
 * The component calls itself recursively provided that the current task has a subtask.
 */

export default ({task, tasks, tasksDone})=> {
    return(
        <div key={task.taskID}>
            <div className="taskContent">
                {/* finds if the current task is considered complete by comparing it with array from backend */}
                <TaskTitleStudent task={task} tasksDone={tasksDone.find(({taskID}) => {return taskID === task.taskID})}/>
                <TaskDeadlineStudent taskDeadline={task.deadline}/>
                <TaskDescStudent taskDesc={task.desc}/>
            </div>
            {task.hasSubtask ? tasks.map((subtask)=> {
                if(subtask.parentTaskID === task.taskID){
                    return (
                        <div className="task-row-subtask" key={subtask.taskID}>
                            <TaskStudent task={subtask} tasks={tasks} tasksDone={tasksDone}/>
                        </div>
                    )
                }
            }):""}
        </div>
    )
}