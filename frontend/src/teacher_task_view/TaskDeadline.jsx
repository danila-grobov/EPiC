import React from 'react';
import '../scss/taskDeadline.scss'

export default (taskDeadline) => {
    const changeDeadline = () => {}

    return <input type="text" id="task-deadline"
                  defaultValue={taskDeadline.taskDeadline} onChange={changeDeadline}
                  placeholder="yyyy-mm-dd hour:min:sec"/>
}