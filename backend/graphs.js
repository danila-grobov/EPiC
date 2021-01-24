import {getDBSession} from "./database";
import React from "react";

const domainName = "http://localhost/";

export function getTaskStatementData(course, taskID, date) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();

        const query = "SELECT COUNT(Grades.Email), COUNT(TasksDone.TaskID)" +
            " FROM Grades LEFT JOIN TasksDone " +
            " ON Grades.Email = TasksDone.Email " +
            " AND TaskID = " + taskID +
            " AND TasksDone.DateDone > '"+date+"' WHERE Grades.CourseName = '"+course+"'";

        return (session.sql(query).execute());

    }).then(res => {
        const[totalTasks, tasksDone] = res.fetchOne();
        return {totalTasks, tasksDone};
    })
}

export function getTasks(course) {
    return getDBSession(session => {

        session.sql("USE EPiC").execute();

        const query = "SELECT TaskTitle " +
            " FROM Tasks " +
            " WHERE CourseName = '"+course+"'";

        const query2 = "SELECT TaskID " +
            " FROM Tasks " +
            " WHERE CourseName = '"+course+"'";

        return Promise.all(
            [session.sql(query).execute(), session.sql(query2).execute()]
        )

    }).then(res => {
        const tasks = res[0].fetchAll().map(task => task[0]);
        const taskIDs = res[1].fetchAll().map(ID => ID[0]);
        return {tasks, taskIDs};
    })
}

export function getLineData(course, date) {
    return getDBSession(session => {

        session.sql("USE EPiC").execute();
        const query = "SELECT ConfidenceLevel " +
            " FROM Confidence " +
            " WHERE Date > '" + date + "' AND CourseName = '"+course+"'";

        const query2 = "SELECT Date " +
            " FROM Confidence " +
            " WHERE Date > '" + date + "' AND CourseName = '"+course+"'";

        return Promise.all(
            [session.sql(query).execute(), session.sql(query2).execute()]);

    }).then(res => {
        const confidenceVals = res[0].fetchAll().map(con => con[0]);
        const CDates = res[1].fetchAll().map(dat => dat[0]);
        return {confidenceVals, CDates};
    })
}

export function getPieData(course, filter, date) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();

        const query = "SELECT Confidence.ConfidenceLevel " +
        " FROM Confidence " +
        " INNER JOIN Students " +
        " ON Confidence.Email = Students.Email " +
        " WHERE Confidence.CourseName = '" + course + "'" +
        " AND Date = '" + date + "' " + filter;

        return (session.sql(query).execute());

    }).then(res => {
        return res.fetchAll().map(con => con[0]);
    })
}

export function getScatterData(course, filter) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();

        let query = "SELECT Confidence.ConfidenceLevel, Grades.Grade, Students.Gender " +
            " FROM Confidence " +
            " INNER JOIN Grades " +
            " ON Confidence.Email = Grades.Email " +
            " INNER JOIN Students " +
            " ON Confidence.Email = Students.Email " +
            " WHERE Grades.CourseName = '" + course + "'";

        if (filter === "Gender"){
            query = "SELECT Confidence.ConfidenceLevel, Grades.Grade, Students.Gender " +
                " FROM Confidence " +
                " INNER JOIN Grades " +
                " ON Confidence.Email = Grades.Email " +
                " INNER JOIN Students " +
                " ON Confidence.Email = Students.Email " +
                " WHERE Grades.CourseName = '" + course + "'";

        } else if (filter === "Nationality"){
            query = "SELECT Confidence.ConfidenceLevel, Grades.Grade, Students.StudentType " +
                " FROM Confidence " +
                " INNER JOIN Grades " +
                " ON Confidence.Email = Grades.Email " +
                " INNER JOIN Students " +
                " ON Confidence.Email = Students.Email " +
                " WHERE Grades.CourseName = '" + course + "'";

        } else if (filter === "Ability"){
            query = "SELECT Confidence.ConfidenceLevel, Grades.Grade, Students.Skill " +
                " FROM Confidence " +
                " INNER JOIN Grades " +
                " ON Confidence.Email = Grades.Email " +
                " INNER JOIN Students " +
                " ON Confidence.Email = Students.Email " +
                " WHERE Grades.CourseName = '" + course + "'";

        }

        return session.sql(query).execute();

    }).then(res => {
        const scatValues = res.fetchAll();
        return {scatValues};
    })
}
