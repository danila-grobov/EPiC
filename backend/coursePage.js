import {getDBSession} from "./database";
import moment from "moment";
import {escape} from "sqlstring";

export function getDeadlines(email) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        const dateInAMonth = moment().add(30, 'days').format('YYYY-MM-DD');
        const SQL = `
            SELECT t.Deadline, c.Color, t.TaskTitle
            FROM Grades AS g
            JOIN Tasks t ON t.CourseName = g.CourseName
            JOIN Courses c ON c.CourseName = t.CourseName
            LEFT JOIN TasksDone td ON td.TaskID = t.TaskID AND td.Email = ${escape(email)}
            WHERE  
                g.Email = ${escape(email)} 
                AND t.Deadline IS NOT NULL 
                AND td.TaskID IS NULL
                AND t.Deadline <= ${escape(dateInAMonth)}
        `;
        return session.sql(SQL).execute();
    }).then(result => formatDeadlines(result.fetchAll()))
}

function formatDeadlines(deadlines) {
    return deadlines.map(deadline => ({
        name: deadline[2],
        deadline: moment(deadline[0]).format("MMMM D"),
        color: deadline[1]
    }))
}

export function getCourses(email) {
    return getDBSession(session => {
        session.sql("USE EPiC").execute();
        const SQL = `
           SELECT c.CourseName, c.Color ,COUNT(td.TaskID) * 100 / COUNT(t.TaskID), c.FullCourseName
           FROM Grades g
                    JOIN Courses c on g.CourseName = c.CourseName
                    JOIN Tasks t ON c.CourseName = t.CourseName
                    LEFT JOIN TasksDone td on t.TaskID = td.TaskID AND td.Email = ${escape(email)}
           WHERE g.Email = ${escape(email)}
           GROUP BY c.CourseName
       `;
        return session.sql(SQL).execute();
    }).then(result => formatCourses(result.fetchAll()));
}

function formatCourses(courses) {
    return courses.map(course => ({
        name: course[0],
        color: course[1],
        progress: parseFloat(course[2]),
        fullCourseName: course[3]
    }))
}

export function getDeadlinesByCourse(email, course) {
    return getDBSession(session => {
        session.sql('USE EPiC').execute();
        return session.sql(`
            SELECT t.TaskTitle, t.Deadline, td.taskID
            FROM Tasks AS t
            LEFT JOIN TasksDone td ON t.TaskID = td.TaskID AND Email = ${escape(email)}
            WHERE t.CourseName = ${escape(course)} AND t.Deadline IS NOT NULL
        `).execute();
    }).then( result => formatCourseDeadlines(result.fetchAll()))
}

function formatCourseDeadlines(tasks) {
    return tasks.map(task => ({
        title: task[0],
        date: moment(task[1]).format("DD MMMM YYYY"),
        completed: task[2] !== null
    }))
}