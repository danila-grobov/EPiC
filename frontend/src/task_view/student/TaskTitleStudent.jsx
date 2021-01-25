/**
 * @author Erikas Nakonecnikovas
 */
import React, {useState, useEffect} from 'react';
import '../../scss/taskTitle.scss';
import checkbox from '../../imgs/checkbox.svg';
import checkbox__checked from '../../imgs/checkbox__checked.svg'
import checkbox__partial from '../../imgs/checkbox_partial.svg'
import axios from 'axios_redirect';

/**
 * The component displays the title of the task for the student.
 * Controls behaviours of the checkbox that indicates if a task is marked complete
 * or not for the student. Makes calls to the backend to either add or delete a
 * completed task.
 */

export default ({task, tasksDone}) => {
    const [checked, setChecked] = useState(false);
    /* handle events everytime a checkbox is clicked */
    const handleCheckbox = () => {
        setChecked(!checked);
        if(checked){
            axios.delete('/api/s/tasks/tasksDone', {params: {taskID: task.taskID}}).then(({data}) => {
                console.log("Delete");
            })}
        else if(!checked){
            axios.post('/api/s/tasks/tasksDone', {taskID: task.taskID}).then(({data}) => {
                console.log("Post")
            })}
    }
    /* sets a task's completion status on initial render */
    useEffect(() =>{
        setChecked(tasksDone !== undefined)
    }, [tasksDone])
    /* sets the checkbox icon based on the task's completion status on every re-render */
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
            <span>{task.taskTitle}</span>
        </div>
    )
}