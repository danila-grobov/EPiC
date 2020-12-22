import React from 'react';
import data from './testTaskData';

export default (props) => {
    console.log(props);
    console.log(data);
    return(
        <div className="tasks">
            <p>Tasks</p>
            {data.map(taskData => (
                <p>{taskData.taskName + taskData.desc + taskData.datetime}</p> // css style to separate
                )
            )}
        </div>
    )
}/*{data.map((taskData) => (
    taskData.filter((value)=> value.type !== "taskID" && value.type !== "parentID").map(value => (
        value.value
    ))
))}*/