import React from 'react';
import {getDBSession} from "./database";
import {escape} from "sqlstring";
import moment from 'moment';

export function getTasks(course) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        return session.sql(`SELECT * FROM Tasks
                                WHERE CourseName=${escape(course)}
                                ORDER BY TaskID`
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
export function getTasksDone(course, email){
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        return session.sql(`SELECT Tasks.TaskID FROM Tasks
                                LEFT JOIN TasksDone ON Tasks.TaskID=TasksDone.TaskID
                                WHERE CourseName=${escape(course)} AND Email=${escape(email)}`
        ).execute();
    }).then(res =>
        res.fetchAll().map(taskDone => ({
            taskID: taskDone[0]
        }))
    )
}

export function deleteTaskDone(taskID, email) {
    return getDBSession(session => {
        const taskDone = session.getSchema("EPiC").getTable("TasksDone");
        return taskDone
            .delete()
            .where(`Email=${escape(email)} AND TaskID=${escape(taskID)}`)
            .execute()
    })
}

export function addTaskDone(taskID, email) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        const todaysDate = moment().format("YYYY-MM-DD");
        return session.sql(`INSERT INTO TasksDone (Email, TaskID, DateDone)
                            VALUES (${escape(email)}, ${escape(taskID)}, ${escape(todaysDate)})`
        ).execute()
            .catch(e =>{
                    console.log(e.message);
                })
    })
}