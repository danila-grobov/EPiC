import {getDBSession} from "./database";
import {emailMessage} from "./email";
import {escape} from "sqlstring";
import React from "react";

const domainName = "http://localhost/";

//Gets teacher's name
function getTeacherName(email){
    return getDBSession(session => {

        //const teachers = session.getSchema("EPiC").getTable("Teachers").get
        //const whereClause = emails.map(email => `Email = "${email}"`)

        session.sql("USE EPiC").execute();
        const teacherNameSQL = `
            SELECT Firstname
            FROM Teachers
            WHERE Email= ${escape(email)}
            
        `
        return session.sql(teacherNameSQL).execute();
    }) .then(result => {
           const[firstName] = result.fetchOne()
           return firstName;
        })


}