import React from 'react';
import {getDBSession} from "./database";
import {escape} from "sqlstring";
import moment from 'moment';

export function getSTasks(course, email) {
    console.log(email);
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        return session.sql(`SELECT * FROM Tasks
                                LEFT JOIN TasksDone
                                ON Tasks.TaskID = TasksDone.TaskID
                                WHERE CourseName=${escape(course)} AND Email=${escape(email)}`
        ).execute();
    }).then(res =>
        res.fetchAll().map(task => ({
                taskID: task[0],
                taskTitle: task[1],
                parentTaskID: task[3],
                hasSubtask: task[4],
                desc: task[5],
                deadline: moment(task[6]).format("DD-MM-YYYY HH:mm:ss"),
                TaskDoneTaskID: task[8]
        }))
    )
}
// cascade delete