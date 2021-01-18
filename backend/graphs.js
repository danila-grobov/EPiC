import {getDBSession} from "./database";
import React from "react";
import {escape} from "sqlstring";

const domainName = "http://localhost/";

export function addStudentsToDB(data, course) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        session.sql("START TRANSACTION").execute();
        session.sql("SET autocommit=0").execute();
        const errors = [];


    })
}