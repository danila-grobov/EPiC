/**
 * @author Erikas Nakonecnikovas
 */
import React from 'react';
import '../../scss/taskDeadline.scss'

export default (taskDeadline) => {
    return <p id="task-deadline">{taskDeadline.taskDeadline !== "Invalid date" ? taskDeadline.taskDeadline : ""}</p>
}