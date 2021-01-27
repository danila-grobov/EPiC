/**
 * @author Erikas Nakonecnikovas
 */
import React, {useEffect, useState} from 'react';
import '../../scss/tasks.scss';
import axios from "axios_redirect";
import TaskStudent from "./TaskStudent";

/**
 * The component gets all task data from backend for the selected course and
 * maps through that data to render all main tasks (tasks with no parent task id).
 */

export default (props) => {

    const [taskData, setTaskData] = useState([]);
    const [tasksDone, setTasksDone] = useState([]);

    /* get all task data for selected course from backend */
    useEffect(() => {
        axios.get('/api/tasks', {params:{course:props.course}}).then(({data}) => {
            return data;
        }).then((tasksData)=> {
            axios.get('/api/s/tasks/tasksDone', {params:{course:props.course}}).then(({data}) => {
                setTaskData(tasksData);
                setTasksDone(data);
        })})
    }, [props.course]);
    return (
        <div className="tasks-list">
            {taskData.map((task) => {
                if(task.parentTaskID==="" || task.parentTaskID === null){
                    return(
                        <div className="task-row-main" key={task.taskID}>
                            <TaskStudent task={task} tasks={taskData} tasksDone={tasksDone}/>
                        </div>
                    )
                }
            })}
        </div>
    )
}