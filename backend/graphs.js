import {getDBSession} from "./database";
import React from "react";

const domainName = "http://localhost/";

export function getTaskStatementData(course, taskID, date) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();

        const query = "SELECT COUNT(Grades.Email), COUNT(TasksDone.TaskID)" +
            "FROM Grades LEFT JOIN TasksDone" +
            "ON Grades.Email = TasksDone.Email" +
            "AND TaskID = " + 5 +
            "AND TasksDone.DateDone < '2021-09-05' WHERE Grades.CourseName = CSC2031";

        return (session.sql(query).execute());

    }).then(res => {
        const[thisData] = res.fetchOne();
        return {thisData};
    })
}