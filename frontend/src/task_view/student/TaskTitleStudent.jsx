import React from 'react';
import '../../scss/taskTitle.scss'

export default (taskName) => {
    return <h1 id="task-title">{taskName.taskName}</h1>
}