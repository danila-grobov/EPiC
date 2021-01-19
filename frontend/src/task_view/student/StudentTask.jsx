import React from 'react';
import TaskTitleStudent from "./TaskTitleStudent";
import TaskDeadlineStudent from "./TaskDeadlineStudent";
import TaskDescStudent from "./TaskDescStudent";
import StudentTask from "./StudentTask";

export default (props)=> {
    const task = props.task;
    const tasksArr = props.tasks;

    return(
        <div key={task.taskID}>
            <div className="task-body">
                <TaskTitleStudent taskName={task.taskName}/>
                <TaskDeadlineStudent taskDeadline={task.deadline}/>
                <TaskDescStudent taskDesc={task.desc}/>
            </div>
            {/* subtasks rendered when they exist for current task */}
            {task.hasSubtasks ? tasksArr.map(subtask => {
                if(subtask.parentID === task.taskID){
                    return (
                        <div className="task-row-subtask" key={subtask.taskID}>
                            <StudentTask task={subtask} tasks={tasksArr}/>
                        </div>
                    )
                }
            }):""}
        </div>
    )
}