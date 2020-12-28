import {getDBSession} from "./database";
import {emailMessage} from "./email";
import React from "react";

const domainName = "http://localhost/";

export function addStudentsToDB(data, course) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        session.sql("START TRANSACTION").execute();
        session.sql("SET autocommit=0").execute();
        return Promise.all(data.map(element => {
            return session.sql(`
                    INSERT INTO Students (${Object.keys(element).join(", ")})
                    VALUES (${getSQLValues(Object.values(element))})
                `).execute().then(() => session.sql(`
                    INSERT INTO Grades (Username, CourseName)
                    VALUES ("${element.Username}", "${course}")
                `).execute()).then(
                    () => emailMessage(
                        domainName + "register/" + element.Username,
                        element.Email)
                 ) //TODO: separate student insertion to the system and to the course.
        })).then(() => {
                session.sql("COMMIT;").execute();
        })
        .catch((error) => {
            console.log(error.message);
            session.sql("ROLLBACK").execute()
            return true;
        })
    })
}

function getSQLValues(values) {
    return values.map(value => `"${value}"`).join(", ")
}

function getSQLBody(course, whereClause) {
    return `
        FROM Students AS s
        JOIN Grades g ON s.Username = g.Username
        JOIN Courses c ON g.CourseName= c.CourseName
        WHERE c.CourseName = "${course}" ${whereClause}`;
}

export function getStudentsFromDB({count, offset, course}, filters = []) {
    return getDBSession(session => {
        const columnNames = [
            "s.Firstname", "s.Lastname", "s.Username",
            "s.Email", "s.InviteStatus"
        ];
        const whereClause = getFilterWhereClause(filters, columnNames);
        session.sql("USE EPiC").execute();
        const dataSQL = `
            SELECT ${columnNames.join(", ")}
            ${getSQLBody(course, whereClause)}
            LIMIT ${count} OFFSET ${offset} `;
        const countSQL = `
            SELECT COUNT(s.Username)
            ${getSQLBody(course, whereClause)}`;
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

export function removeStudentFromDB(usernames) {
    return getDBSession(session => {
        const grades = session.getSchema("EPiC").getTable("Grades");
        const whereClause = usernames.map(username => `Username = "${username}"`).join(" OR ");
        return grades
            .delete()
            .where(whereClause)
            .execute()
    })
}

export function setStudentGrades({data, course}) {
    return getDBSession(session => {
        const grades = session.getSchema("EPiC").getTable("Grades");
        session.sql("USE EPiC").execute();
        const whereClause =
            " AND (" + data
                .map(({email}, index) => `s.Email = "${email}"`)
                .join(" OR ") + ")";
        const dataSQL = `
            SELECT s.Username
            ${getSQLBody(course, whereClause)}`;
        return session.sql(dataSQL).execute().then((result) => {
            const emails = result.fetchAll();
            const updateObj = grades.update();
            const promises = data.map(
                ({grade}, index) =>
                    updateObj
                        .set("Grade", grade)
                        .where(`Username = "${emails[index]}"`)
                        .execute()
            )
            return Promise.all(promises);
        })
    })
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