import React from 'react';
import '../scss/taskDesc.scss'

export default (taskDesc) => {
    const changeDesc = () => {}

    return <input type="text" id="task-desc" name="task-desc" defaultValue={taskDesc.taskDesc} onChange={changeDesc}/>
}