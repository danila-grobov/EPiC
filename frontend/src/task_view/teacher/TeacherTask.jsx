import React from 'react'
import TaskTitleTeacher from "./TaskTitleTeacher";
import TaskDeadlineTeacher from "./TaskDeadlineTeacher";
import TaskDescTeacher from "./TaskDescTeacher";
import TeacherTask from "./TeacherTask";

export default (props)=> {
    const task = props.task;
    const tasksArr = props.tasks;

    return(
        <div key={task.taskID}>
            <div className="task-body">
                <TaskTitleTeacher taskTitle={task.taskTitle}/>
                <TaskDeadlineTeacher taskDeadline={task.deadline}/>
                <TaskDescTeacher taskDesc={task.desc}/>
            </div>
            {/* subtasks rendered when they exist for current task */}
            {task.hasSubtask ? tasksArr.map(subtask => {
                if(subtask.parentTaskID === task.taskID){
                    return (
                        <div className="task-row-subtask" key={subtask.taskID}>
                            <TeacherTask task={subtask} tasks={tasksArr}/>
                        </div>
                    )
                }
            }):""}
        </div>
    )
}