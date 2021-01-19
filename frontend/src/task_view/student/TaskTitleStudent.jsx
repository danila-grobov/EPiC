import React, {useState} from 'react';
import '../../scss/taskTitle.scss';

export default (taskName) => {
    const [checked, setChecked] = useState(false);

    const handleCheckboxChange = () => {
        setChecked(!checked);
    }

    return(
        <div className="task-title-checkbox">
            <label id="task-title">
                <input type="checkbox"
                       name={taskName.taskName}
                       checked={checked}
                       onChange={handleCheckboxChange}
                       className="task-title-checkbox-input"/>
                {taskName.taskName}
            </label>
        </div>
    )
}