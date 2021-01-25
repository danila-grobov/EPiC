import {getDBSession} from "./database";
import {emailMessage} from "./email";
import {escape} from "sqlstring";
import React from "react";

const domainName = "http://localhost/";

//Gets teacher's name
export function getTeacherData(email){
    return getDBSession(session => {

        //const teachers = session.getSchema("EPiC").getTable("Teachers").get
        //const whereClause = emails.map(email => `Email = "${email}"`)

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

