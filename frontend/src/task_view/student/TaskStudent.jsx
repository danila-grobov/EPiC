import React from 'react';
import TaskTitleStudent from "./TaskTitleStudent";
import TaskDeadlineStudent from "./TaskDeadlineStudent";
import TaskDescStudent from "./TaskDescStudent";
import TaskStudent from "./TaskStudent";

export default ({task, tasks, tasksDone})=> {
    return(
        <div key={task.taskID}>
            <div className="taskContent">
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