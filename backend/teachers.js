/**
 * @author Sofia Trevino
 */
import {getDBSession} from "./database";
import {emailMessage} from "./email";
import {escape} from "sqlstring";
import React from "react";

/**
 * teacher.js queries the database and retrieves the current teacher's name and the courses they teach using the email
 * stored in the session.
 *
 */

const domainName = "http://localhost/";
export function getTeacherData(email){
    return getDBSession(session => {

        session.sql("USE EPiC").execute();
        const teacherNameSQL = `
            SELECT Firstname
            FROM Teachers
            WHERE Email= ${escape(email)} 
        `
        const coursesSQL = `
            SELECT CourseName
            FROM Teaches
            WHERE Email= ${escape(email)}
        
        `
        return Promise.all(
            [session.sql(teacherNameSQL).execute(), session.sql(coursesSQL).execute()]
        )

    }) .then(results => {
           const[firstName] = results[0].fetchOne();
           const courses = results[1].fetchAll().map(course => course[0]);
           return {firstName, courses};
        })

}

