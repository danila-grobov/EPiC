import React from 'react';
import {getDBSession} from "./database";
import {escape} from "sqlstring";
import moment from 'moment';

export function getTasks(course) {
    console.log(course);
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        return session.sql(`SELECT * FROM Tasks
                                WHERE CourseName=${escape(course)}`
        ).execute();
    }).then(res =>
        res.fetchAll().map(task => ({
                taskID: task[0],
                taskTitle: task[1],
                parentTaskID: task[3],
                hasSubtask: task[4],
                desc: task[5],
                deadline: moment(task[6]).format("DD-MM-YYYY HH:mm:ss")
        }))
    )
}

// join tasks done left join, to check if tasks done req.session.email cascade delete