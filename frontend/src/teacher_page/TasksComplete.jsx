import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import { extendMoment } from 'moment-range';

const momentRange = require('moment-range');
momentRange.extendMoment(moment);


export default({course, task, date}) => {
    // Call to DB using 'task' and date as parameters.
    // x --> number of times given task ID appears in tasksDone table.
    // y --> Number of students associated with current course.
    // period --> in the last ___ days, weeks months etc. from date in tasksDone table

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
                console.log(res.data.thisData);
                setTasksDone(res.data.thisData)
            }
        )

            // setTasksDone(data.completeTasks);
            // setNumStudents(data.numStudents);
            // console.log("Yeet" + data);
        })


    return (
        <h1>{tasksDone}/{numStudents} have completed tasks in this period</h1>
    )
}

