/**
 * @author Erikas Nakonecnikovas
 */
import React from 'react';
import '../../scss/taskTitle.scss'

/**
 * The component displays the title of the task for the teacher.
 * The text can be edited however, there is no validation and no connection to
 * backend to save the changes made.
 */

export default (taskName) => {
    // need validation, when task name left empty reset it to previous task name (fix this to be on loss of focus)
    const changeTitle = () => {
        if(document.getElementsByClassName("task-title").value === ""){
            document.getElementsByClassName("task-title").value = taskName.taskTitle
        }
    }

    return <input type="text" className="task-title" defaultValue={taskName.taskTitle} onChange={changeTitle}/>
}