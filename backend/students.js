/**
 * @author Danila Grobov
 */
import {getDBSession} from "./database";
import {sendMessagesInBulk} from "./email";
import React from "react";
import md5 from "md5";
import {v4 as uuidV4} from "uuid";
import {escape} from "sqlstring";

const domainName = "http://localhost/";

/**
 * Invites students to the system and adds them to the course.
 * @param data
 * @param course
 * @returns Promise(errors)
 */
export function addStudentsToDB(data, course) {
    const emailsToSend = [];
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        let errors = [];
        if(data.length > 100)
            return Promise.resolve(["Cannot send more than 100 emails at once."])
        return data.reduce(async (prevPromise, element) =>
            prevPromise.then(() => new Promise(async resolve => {
                try {
                    const result = await session.sql(`
                    SELECT InviteStatus, Username
                    FROM Students
                    WHERE Email = ${escape(element.Email)}`
                    ).execute();
                    const studentData = result.fetchOne();
                    if (studentData) {
                        const [inviteStatus, username] = studentData;
                        if (inviteStatus === 'waiting')
                            emailsToSend.push({
                                email: element.Email,
                                message: domainName + "register/" + username
                            });
                    } else if (!studentData) {
                        emailsToSend.push({
                            email: element.Email,
                            message: domainName + "register/" + element.Username
                        })
                        await session.sql(`
                            INSERT INTO Students (${Object.keys(element).join(", ")})
                            VALUES (${getSQLValues(Object.values(element))})
                        `).execute()
                    }
                    await session.sql(`
                        INSERT INTO Grades (Email, CourseName)
                        VALUES (${escape(element.Email)}, ${escape(course)})
                    `).execute()
                } catch (error) {
                    if(!error.message.match(/Duplicate entry '.*' for key 'Grades.(CourseName|Email)'/))
                        errors.push(`Unexpected error occurred, when trying to invite ${element.Email}.`)
                }
                resolve();
            })),Promise.resolve()
        ).then(() =>
            sendMessagesInBulk(emailsToSend)
        ).catch(error => {
            if (error.responseCode === 550)
                errors = ["Daily email limit exceeded."]
            if (error.responseCode === 421)
                errors = ["Too many emails sent at once."]
        }).then(() => errors)

    })
}

/**
 * Format an array to be used in the SQL statement.
 * @param values
 * @returns formatted string with values.
 */
function getSQLValues(values) {
    return values.map(value => escape(value)).join(", ")
}

/**
 * Generate an SQL statement to select students by their email from the course.
 * @param course
 * @param whereClause
 * @returns string SQL statement
 */
function getSQLBody(course, whereClause) {
    return `
        FROM Students AS s
        JOIN Grades g ON s.Email = g.Email
        JOIN Courses c ON g.CourseName= c.CourseName
        WHERE c.CourseName = ${escape(course)} ${whereClause}`;
}

/**
 * Gets a subset of students from the database.
 * @param count
 * @param offset
 * @param course
 * @param filters
 * @param sortState
 * @returns Promise(students)
 */
export function getStudentsFromDB({count, offset, course}, filters = [], sortState) {
    return getDBSession(session => {
        const columnNames = [
            "s.Firstname", "s.Lastname", "s.Username",
            "s.Email", "s.InviteStatus"
        ];
        const whereClause = getFilterWhereClause(filters, columnNames);
        const sortIndex = parseInt(sortState.index);
        const descending = sortState.ascending === "false";
        session.sql("USE EPiC").execute();
        const dataSQL = `
            SELECT ${columnNames.join(", ")}
            ${getSQLBody(course, whereClause)}
            ${sortIndex !== -1 ? "ORDER BY " + columnNames[sortIndex] + (descending ? " DESC" : ""): ""}
            LIMIT ${count} OFFSET ${offset}`;
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
                count: count.fetchOne()[0]
            }
        }
    )
}

/**
 * Removes provided students from the course in the Grades table in the database.
 * @param emails
 * @param course
 * @returns Promise()
 */
export function removeStudentFromDB(emails, course) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        const whereClause = emails.map(
            email => `(Email = ${escape(email)} AND CourseName=${escape(course)})`
        ).join(" OR ");
        return session
            .sql(`DELETE FROM Grades WHERE ${whereClause}`)
            .execute()
    })
}

/**
 * Set course grades of the supplied students.
 * @param data
 * @param course
 * @returns Promise()
 */
export function setStudentGrades({data, course}) {
    return getDBSession(session => {
        const grades = session.getSchema("EPiC").getTable("Grades");
        const updateObj = grades.update();
        const promises = data.map(
            ({grade, email}) =>
                updateObj
                    .set("Grade", grade)
                    .where(`Email = ${escape(email)} AND CourseName = ${escape(course)}`)
                    .execute()
        )
        return Promise.all(promises);
    })
}

/**
 * Updates the student's data in the database, by the provided token.
 * @param data
 * @returns Promise(errors)
 */
export function registerStudent(data) {
    return getDBSession(session => {
        const salt = md5(uuidV4());
        const password = hashPassword(data.Pwd, salt);
        session.sql("USE EPiC").execute();
        let errors = {};
        return session.sql(`
            UPDATE Students
            SET Username=${escape(data.Username)},
                Pwd=${escape(password)},
                Firstname=${escape(data.Firstname)},
                Lastname=${escape(data.Lastname)},
                Skill=${escape(data.Skill)},
                StudentType=${escape(data.StudentType)},
                Gender=${escape(data.Gender)},
                InviteStatus='accepted'
            WHERE Username=${escape(data.token)}
        `).execute().then(() => errors).catch(
            e => {
                if (e.message.search("Duplicate entry") !== -1)
                    return {...errors, userName: "This username was already taken."};
                else return {...errors, global: "Unexpected error has occurred."}
            }
        );
    })
}

/**
 * Checks if the invite token is valid and can be found in the database.
 * @param inviteToken
 * @returns Promise(email)
 */
export function checkInviteToken(inviteToken) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        return session.sql(`
            SELECT EMAIL
            FROM Students
            WHERE Username=${escape(inviteToken)}
        `).execute();
    }).then(email => email.fetchOne());
}

/**
 * Get a student from the database by his password and username.
 * @param username
 * @param password
 * @returns doesExist
 */
export function getStudent(username, password) {
    return getDBSession(session => {

        session.sql("USE EPiC").execute();
        return session.sql(`
            SELECT Pwd, Email
            FROM Students
            WHERE Username=${escape(username)}
        `).execute()
    }).then(res => {
        const data = res.fetchOne();
        if (data) {
            const salt = data[0].slice(32, 64);
            const hashedPassword = hashPassword(password, salt);
            return data[0] === hashedPassword ? data[1] : false;
        }
        return false;
    });
}

/**
 * Generate SQL where clause from supplied filters.
 * @param filters
 * @param columnNames
 * @returns string SQL where clause.
 */
function getFilterWhereClause(filters, columnNames) {
    const whereClause = filters.map(
        filter => columnNames.map(columnName =>
            filter.split(" || ").map(
                filter => `${columnName} LIKE "%${escape(filter).slice(1, filter.length + 1)}%"`
            ).join(" OR ")
        ).join(" OR ")
    ).join(") AND (");
    return whereClause ? "AND (" + whereClause + ")" : whereClause;
}

/**
 * Format fetched students from the database to fit front-end requirements.
 * @param array
 * @returns {*[]}
 */
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

/**
 * Generates a hash of a given password and appends a salt to it.
 * @param password
 * @param salt
 * @returns string hashed password.
 */
export function hashPassword(password, salt) {
    const hash = md5(password + salt);
    return hash + salt;
}