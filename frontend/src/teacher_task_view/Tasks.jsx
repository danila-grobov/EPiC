import React, {useState} from 'react';
import data from './testTaskData';
import TaskMain from "./TaskMain";

export default (courseName) => {
    // array of all tasks for specific course -
    const tasks = data.map(task => (
        {taskID:task.taskID,
            taskName:task.taskName,
            course:task.course,
            parentID:task.parentID,
            hasSubtasks: task.hasSubtasks,
            desc:task.desc,
            deadline:task.deadline
        }
    ))
    console.log(tasks)

    return (
        <div className="tasks-list">
            {tasks.map(task => {
                if(task.course === courseName.course && task.parentID===""){
                    return(
                        <div className="task-row-main" key={task.taskID}>
                            <TaskMain task={task} tasks={tasks.tasks}/>
                        </div>
                    )
                }
            })}
        </div>
    )
}
/*
data.map(task => {
                    console.log(task)
                    if(task.course === courseName.course && task.parentID === "") {
                        return (
                            <div className="task-row-parent" key={task.taskID}>
                                <h5>{task.taskName}</h5>
                                <span className="task-deadline">{task.deadline}</span>
                                <p className="task-description">{task.desc}</p>
                                {task.hasSubtasks ? data.map(task2 => {
                                    if(task2.parentID === task.taskID){
                                        return(
                                            <div className="task-row-subtask" key={task2.taskID}>
                                                <h5>{task2.taskName}</h5>
                                                <span className="task-deadline">{task2.deadline}</span>
                                                <p className="task-description">{task2.desc}</p>
                                            </div>
                                        )
                                    }
                                }):""}
                            </div>
                        )
                    }
            })
 */