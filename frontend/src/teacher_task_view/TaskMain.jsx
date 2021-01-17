import React from 'react'
import data from './testTaskData'
import TaskSecondary from "./TaskSecondary";
import TaskTitle from "./TaskTitle";
import TaskDesc from "./TaskDesc";
import TaskDeadline from "./TaskDeadline";

export default (props, tasks) => {
    console.log("props: " +props)
    console.log("props.task.taskname: "+props.task.taskName)
    console.log("maintask tasks: "+tasks)
    console.log(Array.from(tasks), tasks.tasks)

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
                                <TaskSecondary task={task} tasks={tasks}/>
                            </div>)
                }
            }):""}
        </div>
    )
}