import React from 'react';
import data from "./testTaskData";
import TaskMain from './TaskMain'
import TaskTitle from "./TaskTitle";
import TaskDesc from "./TaskDesc";
import TaskDeadline from "./TaskDeadline";

export default (props, tasks) => {
    return(
        <div key={props.task.taskID}>
            <div className="task">
            <TaskTitle taskName={props.task.taskName}/>
            <TaskDeadline taskDeadline={props.task.deadline}/><br/>
            <TaskDesc taskDesc={props.task.desc}/><br/>
            </div>
            {props.task.hasSubtasks ? data.map(task => {
                if(task.parentID === props.task.taskID) {
                    return (<div className="task-row-subtask" key={task.taskID}>
                                <TaskMain task={task} tasks={tasks}/>
                            </div>)
                }
            }):""}
        </div>
    )
}