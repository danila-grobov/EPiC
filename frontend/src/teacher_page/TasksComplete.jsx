import React, {useEffect, useState} from "react";
import axios from "axios";
import moment from "moment";
import { extendMoment } from 'moment-range';

const momentRange = require('moment-range');
momentRange.extendMoment(moment);


export default({passedCourse, passedTask, passedDate}) => {
    // Call to DB using 'task' and date as parameters.
    // x --> number of times given task ID appears in tasksDone table.
    // y --> Number of students associated with current course.
    // period --> in the last ___ days, weeks months etc. from date in tasksDone table

    // moment.js for dates

    // const [course, setCourse] = useState(passedCourse);
    // const [task, setTask] = useState(passedTask);
    // const [date, setDate] = useState(passedDate)

    const [tasksDone,setTasksDone] = useState(0);
    const [numStudents,setNumStudents] = useState(0);


    useEffect(()=> {
        axios.get('/api/t/tasks', {
                params: {
                    course: "CSC2031",
                    taskID: 5,
                    date: "2021-09-05"
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

