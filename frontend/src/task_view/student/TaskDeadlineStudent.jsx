import React from 'react';
import '../../scss/taskDeadline.scss'

export default (taskDeadline) => {
    return <p id="task-deadline">{taskDeadline.taskDeadline !== null ? taskDeadline.taskDeadline : ""}</p>
}