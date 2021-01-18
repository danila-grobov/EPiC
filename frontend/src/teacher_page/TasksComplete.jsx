import React from "react";


export default({course, task, date}) => {
    // Call to DB using 'task' and date as parameters.
    // x --> number of times given task ID appears in tasksDone table.
    // y --> Number of students associated with current course.
    // period --> in the last ___ days, weeks months etc. from date in tasksDone table

    // moment.js for dates


    return (
        <h1>x/y have completed tasks in this period</h1>
    )
}

