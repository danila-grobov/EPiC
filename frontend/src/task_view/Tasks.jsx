import React, {useEffect, useState} from 'react';
import '../scss/tasks.scss';
import StudentTask from "./student/StudentTask";
import TeacherTask from "./teacher/TeacherTask";
import axios from "axios_redirect";

export default (props) => {
    console.log(props.course);

    const [taskData, setTaskData] = useState([]);

    // get tasks for selected course from backend
    useEffect(() => {
        axios.get('/api/tasks', {params:{course:props.course}}).then(({data}) => {
            setTaskData(data);
        })
    }, [props.course])

    return (
        <div className="tasks-list">
            {taskData.map(task => {
                console.log(task);
                console.log(task.taskID, task.taskTitle, task.parentTaskID);
                // displays main tasks from selected course for current user
                if(task.parentTaskID==="" || task.parentTaskID === null){
                    return(
                        <div className="task-row-main" key={task.taskID}>
                            {props.user === "teacher" ?
                                <TeacherTask task={task} tasks={taskData}/>:
                                props.user === "student" ?
                                    <StudentTask task={task} tasks={taskData}/>: "Not a recognised user"
                            }
                        </div>
                    )
                }
            })}
        </div>
    )
}