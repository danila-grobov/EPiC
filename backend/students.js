import {getDBSession} from "./database";
import {emailMessage} from "./email";
import React from "react";

const domainName = "http://localhost/";

export function addStudentsToDB(data, course) {
    return getDBSession(session => {
        const students = session.getSchema("EPiC").getTable("Students");
        const grades = session.getSchema("EPiC").getTable("Grades");
        return Promise.all(data.map(element => {
            students
                .insert(Object.keys(element))
                .values(Object.values(element))
                .execute()
                .then(() => {
                    grades
                        .insert(["Username", "CourseName"])
                        .values(element.Username, course)
                        .execute();
                })
            return emailMessage(domainName + "register/" + element.Username, element.Email);
        }));
    })
}

export function getStudentsFromDB({count, offset, course}, filters = []) {
    return getDBSession(session => {
        const columnNames = [
            "s.Firstname", "s.Lastname", "s.Username",
            "s.Email", "s.InviteStatus"
        ];
        const whereClause = getFilterWhereClause(filters, columnNames);
        session.sql("USE EPiC").execute();
        const SQLBody = `
            FROM Students AS s
            JOIN Grades g ON s.Username = g.Username
            JOIN Courses c ON g.CourseName= c.CourseName
            WHERE c.CourseName = "${course}" ${whereClause}`
        const dataSQL = `
            SELECT ${columnNames.join(", ")}
            ${SQLBody}
            LIMIT ${count} OFFSET ${offset} `;
        const countSQL = `
            SELECT COUNT(s.Username)
            ${SQLBody}`;
        return Promise.all([
            session.sql(dataSQL).execute(),
            session.sql(countSQL).execute()
        ]);
    }).then(
        ([students, count]) => {
            return {
                students: formatStudentArray(students.fetchAll()),
                count: count.fetchOne()
            }
        }
    )
}

function getFilterWhereClause(filters, columnNames) {
    const whereClause = filters.map(
        filter => columnNames.map(columnName =>
            filter.split(" || ").map(
                filter => `${columnName} LIKE "%${filter}%"`
            ).join(" OR ")
        ).join(" OR ")
    ).join(") AND (");
    return whereClause ? "AND (" + whereClause + ")" : whereClause;
}

function formatStudentArray(array) {
    const header = [
        {value: "First name", type: "title"},
        {value: "Last name", type: "title"},
        {value: "Username", type: "title"},
        {value: "Email", type: "title"},
        {value: "Status", type: "title"}
    ];
    const valuesWithType = array.map(valueArray => valueArray.map((value, index) => {
        const type =
            index !== 4 ? "text" :
                value === "waiting" ? "warning" :
                    value === "accepted" ? "info" :
                        value === "canceled" ? "danger" : "";
        return {value, type}
    }));
    return [header, ...valuesWithType]
}

