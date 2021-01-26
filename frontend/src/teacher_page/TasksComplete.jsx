/**
 * @author Jake Hobbs
 */

import React, {useEffect, useState} from "react";
import axios from "axios";
import "../scss/teacher_page/teacherPage.scss";

/**
 * Get total number of tasks, and number of complete tasks for current module and display as fraction.
 */

export default({course, task, date}) => {
    // Set initial states.
    const [tasksDone,setTasksDone] = useState(0);
    const [numStudents,setNumStudents] = useState(0);

    useEffect(()=> {
        // Call to EPiC database passing parameters.
        axios.get('/api/t/tasks', {
                params: {
                    course: course,
                    taskID: task,
                    date: date
                }
            }).then(res => {
                // Set results.
                setTasksDone(res.data.tasksDone);
                setNumStudents(res.data.totalTasks);
            }
        )
    })

    return (
        // Element returned.
        <h1>{tasksDone}/{numStudents} have completed tasks in this period</h1>
    )
}

