import {getDBSession} from "./database";
import {escape} from "sqlstring";
import React from "react";

//Gets current student's name
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