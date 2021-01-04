import {getDBSession} from "./database";
import {emailMessage} from "./email";
import React from "react";

const domainName = "http://localhost/";

export function addStudentsToDB(data, course) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        session.sql("START TRANSACTION").execute();
        session.sql("SET autocommit=0").execute();
        const errors = [];
        return Promise.all(data.map(element => {
            return session.sql(`
                    INSERT INTO Students (${Object.keys(element).join(", ")})
                    VALUES (${getSQLValues(Object.values(element))})
                `)
                .execute()
                .then(
                    () => emailMessage(
                        domainName + "register/" + element.Username,
                        element.Email)
                )
                .catch(e => {
                    //ignore any errors regarding student invite
                    session.sql("ROLLBACK").execute();
                })
                .then(() => session.sql(`
                    INSERT INTO Grades (Email, CourseName)
                    VALUES ("${element.Email}", "${course}")
                `).execute())
                .catch((error) => {
                    if (error.message ===
                        "Cannot add or update a child row: a foreign key constraint fails" +
                        " (`EPiC`.`Grades`, CONSTRAINT `Grades_ibfk_2` FOREIGN KEY (`Email`)" +
                        " REFERENCES `Students` (`Email`))") {
                        errors.push(`Could not invite student with an email "${element.Email}."`);
                    }
                    if(error.message.search("Duplicate") !== -1) {
                        errors.push(`The student with an email ${element.Email} has already been enrolled in the course.`)
                    }
                    else if(error.message) {
                        errors.push(`Unexpected error occurred, when trying to invite ${element.Email}.`)
                    }
                    session.sql("ROLLBACK").execute()
                })
        })).then(() => {
            session.sql("COMMIT").execute();
            return errors;
        })
    })
}

function getSQLValues(values) {
    return values.map(value => `"${value}"`).join(", ")
}

function getSQLBody(course, whereClause) {
    return `
        FROM Students AS s
        JOIN Grades g ON s.Email = g.Email
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
            SELECT COUNT(s.Email)
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

export function removeStudentFromDB(emails) {
    return getDBSession(session => {
        const grades = session.getSchema("EPiC").getTable("Grades");
        const whereClause = emails.map(email => `Email = "${email}"`).join(" OR ");
        return grades
            .delete()
            .where(whereClause)
            .execute()
    })
}

export function setStudentGrades({data, course}) {
    return getDBSession(session => {
        const grades = session.getSchema("EPiC").getTable("Grades");
        const updateObj = grades.update();
        const promises = data.map(
            ({grade, email}) =>
                updateObj
                    .set("Grade", grade)
                    .where(`Email = "${email}"`)
                    .execute()
        )
        return Promise.all(promises);
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