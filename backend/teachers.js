import {getDBSession} from "./database";
import {escape} from "sqlstring";
import React from "react";

//Gets teacher's name
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

