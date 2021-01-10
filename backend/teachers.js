import {getDBSession} from "./database";
import {emailMessage} from "./email";
import React from "react";

const domainName = "http://localhost/";

//Gets teacher's name
function getTeacherName(email){
    return getDBSession(session => {
        //const teachers = session.getSchema("EPiC").getTable("Teachers").get
        //const whereClause = emails.map(email => `Email = "${email}"`)

        session.sql("USE EPiC").execute();
        const teacherNameSQL = 'SELECT Firstname FROM Teachers WHERE Email= email' //how to get parameter in here?
        return Promise.all([
            session.sql(teacherNameSQL).execute(),
        ]);
    })


}