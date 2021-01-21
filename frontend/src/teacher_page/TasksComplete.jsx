import React, {useEffect, useState} from "react";
import axios from "axios";
import "../scss/teacherPage.scss";

export default({course, task, date}) => {

    const [tasksDone,setTasksDone] = useState(0);
    const [numStudents,setNumStudents] = useState(0);


    useEffect(()=> {
        axios.get('/api/t/tasks', {
                params: {
                    course: course,
                    taskID: task,
                    date: date
                }
            }).then(res => {
                setTasksDone(res.data.tasksDone);
                setNumStudents(res.data.totalTasks);
            }
        )
    })

    return (
        <h1>{tasksDone}/{numStudents} have completed tasks in this period</h1>
    )
}

