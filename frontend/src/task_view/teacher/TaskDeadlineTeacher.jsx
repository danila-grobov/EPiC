import React from 'react';
import '../../scss/taskDeadline.scss'

export default (taskDeadline) => {

    // need to add validation for date time
    const changeDeadline = () => {}

    return <input type="text" id="task-deadline"
                  defaultValue={taskDeadline.taskDeadline} onChange={changeDeadline}
                  placeholder="yyyy-mm-dd hour:min:sec"/>
}