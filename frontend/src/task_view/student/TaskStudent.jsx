import React from 'react';
import TaskTitleStudent from "./TaskTitleStudent";
import TaskDeadlineStudent from "./TaskDeadlineStudent";
import TaskDescStudent from "./TaskDescStudent";
import TaskStudent from "./TaskStudent";

export default ({task, tasks, index})=> {

    return(
        <div key={task.taskID}>
            <div className="taskContent">
                <TaskTitleStudent task={task}/>
                <TaskDeadlineStudent taskDeadline={task.deadline}/>
                <TaskDescStudent taskDesc={task.desc}/>
            </div>
            {task.hasSubtask ? tasks.map((subtask, index )=> {
                if(subtask.parentTaskID === task.taskID){
                    return (
                        <div className="task-row-subtask" key={subtask.taskID}>
                            <TaskStudent task={subtask} tasks={tasks} index={index}/>
                        </div>
                    )
                }
            }):""}
        </div>
    )
}