/**
 * @author Sofia Trevino
 */
import {getDBSession} from "./database";
import {emailMessage} from "./email";
import {escape} from "sqlstring";
import React from "react";

/**
 * Student.js queries the database and retrieves the current student's first name using the email stored in the session.
 *
 */

const domainName = "http://localhost/";
export function getStudentData(email) {
    return getDBSession(session => {

        session.sql("USE EPiC").execute();
        const studentNameSQL = `
            SELECT Firstname
            FROM Students
            WHERE Email= ${escape(email)} 
        `
        return session.sql(studentNameSQL).execute();


    }).then(result => {
        const [firstName] = result.fetchOne();
        return firstName;

    })
}