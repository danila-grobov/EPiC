/**
 * @author Erikas Nakonecnikovas
 */
import React from 'react';
import '../../scss/taskDeadline.scss'

/**
 * The component displays the deadline of the task for the teacher.
 * The text can be edited however, there is no validation and no connection to
 * backend to save the changes made.
 */

export default (taskDeadline) => {

    // need to add validation for date time
    const changeDeadline = () => {}

    return <input type="text" className="task-deadline"
                  defaultValue={taskDeadline.taskDeadline} onChange={changeDeadline}
                  placeholder="dd-mm-yyyy hh:mm:ss"/>
}