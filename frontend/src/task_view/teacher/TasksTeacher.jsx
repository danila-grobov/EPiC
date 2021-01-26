import React, {useEffect, useState} from 'react'
import TaskTeacher from "./TaskTeacher";
import '../../scss/tasks.scss';
import axios from "axios_redirect";

export default (props) => {
    const [taskData, setTaskData] = useState([]);

    // get tasks for selected course from backend
    useEffect(() => {
        axios.get('/api/tasks', {params:{course:props.course}}).then(({data}) => {
            setTaskData(data);
        })
    }, [props.course]);

    return (
        <div className="tasks-list">
            {taskData.map((task) => {
                if(task.parentTaskID==="" || task.parentTaskID === null){
                    return(
                        <div className="task-row-main" key={task.taskID}>
                            <TaskTeacher task={task} tasks={taskData}/>
                        </div>
                    )
                }
            })}
        </div>
    )
}