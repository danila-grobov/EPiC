/**
 * Author: Jake Hobbs
 */

import {getDBSession} from "./database";
import React from "react";

const domainName = "http://localhost/";

// Query function for tasks complete.
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
        // Return retrieved data.
        const[totalTasks, tasksDone] = res.fetchOne();
        return {totalTasks, tasksDone};
    })
}

// Query function for getting tasks.
export function getGraphTasks(course) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();

        // Get task title.
        const query = "SELECT TaskName " +
            " FROM Tasks " +
            " WHERE CourseName = '"+course+"'";

        // Get task ID
        const query2 = "SELECT TaskID " +
            " FROM Tasks " +
            " WHERE CourseName = '"+course+"'";

        return Promise.all(
            [session.sql(query).execute(), session.sql(query2).execute()]
        )

    }).then(res => {
        // Return data.
        const tasks = res[0].fetchAll().map(task => task[0]);
        const taskIDs = res[1].fetchAll().map(ID => ID[0]);
        return {tasks, taskIDs};
    })
}

// Query function for line chart.
export function getLineData(course, date) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();

        console.log(date);
        // Get confidence level.
        const query = "SELECT ConfidenceLevel " +
            " FROM Confidence " +
            " WHERE Date > '" + date + "' AND CourseName = '"+course+"'";

        // Get date.
        const query2 = "SELECT Date " +
            " FROM Confidence " +
            " WHERE Date > '" + date + "' AND CourseName = '"+course+"'";

        return Promise.all(
            [session.sql(query).execute(), session.sql(query2).execute()]);

    }).then(res => {
        // Return data.
        const confidenceVals = res[0].fetchAll().map(con => con[0]);
        const CDates = res[1].fetchAll().map(dat => dat[0]);
        return {confidenceVals, CDates};
    })
}

// Query function for pie chart.
export function getPieData(course, filter, date) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();


        // Get confidence levels.
        const query = "SELECT Confidence.ConfidenceLevel " +
        " FROM Confidence " +
        " INNER JOIN Students " +
        " ON Confidence.Email = Students.Email " +
        " WHERE Confidence.CourseName = '" + course + "'" +
        " AND Date = '" + date + "' " + filter;

        return (session.sql(query).execute());

    }).then(res => {
        // Return data.
        return res.fetchAll().map(con => con[0]);
    })
}

// Query function for scatter chart.
export function getScatterData(course, filter) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();

        // Choose query based on filter.

        // Default query.
        let query = "SELECT Confidence.ConfidenceLevel, Grades.Grade, Students.Gender " +
            " FROM Confidence " +
            " INNER JOIN Grades " +
            " ON Confidence.Email = Grades.Email " +
            " INNER JOIN Students " +
            " ON Confidence.Email = Students.Email " +
            " WHERE Grades.CourseName = '" + course + "'";

        // Select values, with gender filter.
        if (filter === "Gender"){
            query = "SELECT Confidence.ConfidenceLevel, Grades.Grade, Students.Gender " +
                " FROM Confidence " +
                " INNER JOIN Grades " +
                " ON Confidence.Email = Grades.Email " +
                " INNER JOIN Students " +
                " ON Confidence.Email = Students.Email " +
                " WHERE Grades.CourseName = '" + course + "'";

        // Select values, with nationality filter.
        } else if (filter === "Nationality"){
            query = "SELECT Confidence.ConfidenceLevel, Grades.Grade, Students.StudentType " +
                " FROM Confidence " +
                " INNER JOIN Grades " +
                " ON Confidence.Email = Grades.Email " +
                " INNER JOIN Students " +
                " ON Confidence.Email = Students.Email " +
                " WHERE Grades.CourseName = '" + course + "'";

        // Select values, with ability filter.
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
        // Return data.
        const scatValues = res.fetchAll();
        return {scatValues};
    })
}
