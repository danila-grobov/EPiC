import React from 'react';
import '../../scss/taskDesc.scss'

export default (taskDesc) => {
    // need validation
    const changeDesc = () => {}
    // need to find way to make text area scale with amount of text
    return <input type="text" id="task-desc" name="task-desc" defaultValue={taskDesc.taskDesc} onChange={changeDesc}/>
}