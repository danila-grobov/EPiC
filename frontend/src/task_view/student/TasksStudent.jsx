import React, {useEffect, useState} from 'react';
import '../../scss/tasks.scss';
import axios from "axios_redirect";
import TaskStudent from "./TaskStudent";

export default (props) => {

    const [taskData, setTaskData] = useState([]);

    // get tasks for selected course from backend
    useEffect(() => {
        axios.get('/api/s/tasks', {params:{course:props.course}}).then(({data}) => {
            setTaskData(data);
            console.log(data);
        })
    }, [props.course]);

    return (
        <div className="tasks-list">
            {taskData.map((task, index) => {
                if(task.parentTaskID==="" || task.parentTaskID === null){
                    return(
                        <div className="task-row-main" key={task.taskID}>
                            <TaskStudent task={task} tasks={taskData} index={index}/>
                        </div>
                    )
                }
            })}
        </div>
    )
}