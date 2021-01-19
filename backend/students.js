import {getDBSession} from "./database";
import {emailMessage, sendMessagesInBulk} from "./email";
import React from "react";
import md5 from "md5";
import {v4 as uuidV4} from "uuid";
import {escape} from "sqlstring";

const domainName = "http://localhost/";

export function addStudentsToDB(data, course) {
    const emailsToSend = [];
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        let errors = [];
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
                            message: domainName + "register/" + element.userName
                        })
                        await session.sql(`
                        INSERT INTO Students (${Object.keys(element).join(", ")})
                        VALUES (${getSQLValues(Object.values(element))})
                    `).execute()
                    }
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

function getSQLValues(values) {
    return values.map(value => escape(value)).join(", ")
}

function getSQLBody(course, whereClause) {
    return `
        FROM Students AS s
        JOIN Grades g ON s.Email = g.Email
        JOIN Courses c ON g.CourseName= c.CourseName
        WHERE c.CourseName = ${escape(course)} ${whereClause}`;
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
        const whereClause = emails.map(email => `Email = ${escape(email)}`).join(" OR ");
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
                    .where(`Email = ${escape(email)}`)
                    .execute()
        )
        return Promise.all(promises);
    })
}

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

export function hashPassword(password, salt) {
    const hash = md5(password + salt);
    return hash + salt;
}