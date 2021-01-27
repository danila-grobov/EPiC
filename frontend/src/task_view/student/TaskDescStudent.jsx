/**
 * @author Erikas Nakonecnikovas
 */
import React from 'react';
import '../../scss/taskDesc.scss'

/**
 * The component displays the description of the task for the student.
 */

export default (taskDesc) => {
    return <p className="task-desc">{taskDesc.taskDesc !== null ? taskDesc.taskDesc : ""}</p>
}