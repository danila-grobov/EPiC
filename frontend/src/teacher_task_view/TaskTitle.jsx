import React from 'react';
import '../scss/taskTitle.scss'

export default (taskName) => {

    const changeTitle = () => {
        if(document.getElementById("task-title").value === " "){
            document.getElementById("task-title").value = taskName.taskName
        }
    }

    return <input type="text" id="task-title" defaultValue={taskName.taskName} onChange={changeTitle}/>
}