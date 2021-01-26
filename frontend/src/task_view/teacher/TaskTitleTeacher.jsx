import React from 'react';
import '../../scss/taskTitle.scss'

export default (taskName) => {
    // need validation, when task name left empty reset it to previous task name (fix this to be on loss of focus)
    const changeTitle = () => {
        if(document.getElementById("task-title").value === ""){
            document.getElementById("task-title").value = taskName.taskTitle
        }
    }
    console.log("TaskTitleTeacher taskName: ");
    console.log(taskName);

    return <input type="text" id="task-title" defaultValue={taskName.taskTitle} onChange={changeTitle}/>
}