/**
 * @author Erikas Nakonecnikovas
 */
import React from 'react';
import '../../scss/taskDesc.scss'

/**
 * The component displays the description of the task for the teacher.
 * The text can be edited however, there is no validation and no connection to
 * backend to save the changes made.
 */

export default (taskDesc) => {
    // need validation
    const changeDesc = () => {}
    // need to find way to make text area scale with amount of text
    return <input type="text" className="task-desc" name="task-desc" defaultValue={taskDesc.taskDesc} onChange={changeDesc}/>
}