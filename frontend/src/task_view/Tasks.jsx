import React from 'react';
import data from './testTaskData';
import '../scss/tasks.scss'
import StudentTask from "./student/StudentTask";
import TeacherTask from "./teacher/TeacherTask";

export default (props) => {
    // array of all tasks for specific course - this will be loaded from db
    const tasks = data.map(task => (
        {taskID:task.taskID,
            taskName:task.taskName,
            course:task.course,
            parentID:task.parentID,
            hasSubtasks: task.hasSubtasks,
            desc:task.desc,
            deadline:task.deadline
        }
    ))
    console.log(tasks);

    return (
        <div className="tasks-list">
            {tasks.map(task => {
                // displays main tasks from selected course for current user
                if(task.course === props.course && task.parentID===""){
                    return(
                        <div className="task-row-main" key={task.taskID}>
                            {props.user === "teacher" ?
                                <TeacherTask task={task} tasks={tasks}/>:
                                props.user === "student" ?
                                <StudentTask task={task} tasks={tasks}/>: "Not a recognised user"
                            }
                        </div>
                    )
                }
            })}
        </div>
    )
}