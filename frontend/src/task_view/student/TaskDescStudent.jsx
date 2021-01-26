import React from 'react';
import '../../scss/taskDesc.scss'

export default (taskDesc) => {
    return <p id="task-desc">{taskDesc.taskDesc !== null ? taskDesc.taskDesc : ""}</p>
}