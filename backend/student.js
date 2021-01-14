import {getDBSession} from "./database";
import {emailMessage} from "./email";
import {escape} from "sqlstring";
import React from "react";

const domainName = "http://localhost/";

//Gets current student's name
export function getStudentData(email) {
    return getDBSession(session => {

        session.sql("USE EPiC").execute();
        const studentNameSQL = `
            SELECT Firstname
            FROM Students
            WHERE Email= ${escape(email)} 
        `
        return Promise.all[session.sql(studentNameSQL).execute()]


    }).then(result => {
        const firstName = result.fetchAll();
        return firstName;

    })
}