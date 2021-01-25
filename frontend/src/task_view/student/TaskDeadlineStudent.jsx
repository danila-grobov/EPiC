/**
 * @author Erikas Nakonecnikovas
 */
import React from 'react';
import '../../scss/taskDeadline.scss'

/**
 * The component displays the deadline of the task for the student.
 */

export default (taskDeadline) => {
    return <p className="task-deadline">{taskDeadline.taskDeadline !== "Invalid date" ? taskDeadline.taskDeadline : ""}</p>
}