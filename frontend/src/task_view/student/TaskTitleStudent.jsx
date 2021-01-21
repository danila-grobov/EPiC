import React, {useState} from 'react';
import '../../scss/taskTitle.scss';
import checkbox from '../../imgs/checkbox.svg';
import checkbox__checked from '../../imgs/checkbox__checked.svg'
import checkbox__partial from '../../imgs/checkbox_partial.svg'

export default ({task}) => {
    const [checked, setChecked] = useState(false);

    const handleCheckbox = () => {
        setChecked(!checked);
    }

    let icon;

    if (checked){
        icon = checkbox__checked;
    }
    else if (!checked) {
        icon = checkbox;
    }
    else {
        icon = checkbox__partial
    }

    return(
        <div className="task-title-checkbox">
            <img onClick={handleCheckbox} src={icon} alt="checkbox" className="task_row--checkbox"/>
            <div className="cellSeparator"/>
            <span>{task.taskTitle}</span>
        </div>
    )
}