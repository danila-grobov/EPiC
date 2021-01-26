/**
 * @author Danila Grobov, Sofia Trevino, Jake Hobbs, Erikas Nakonecnikovas
 */
import express from "express";
import path from "path";
import hash from "crypto-random-string";
import {getTeacherData} from "./teachers";
import session from "express-session";
import {
    addStudentsToDB,
    checkInviteToken,
    getStudent,
    getStudentsFromDB,
    registerStudent,
    removeStudentFromDB,
    setStudentGrades
} from "./students";
import {testDBConnection} from "./database";
import {getTeacher} from "./teacher";
import {getStudentData} from "./student";
import SessionStore from "./SessionStore";
import {getConfidence, getCourses, getDeadlines, getDeadlinesByCourse, setConfidence} from "./coursePage";
import {getTasks, deleteTaskDone, addTaskDone, getTasksDone} from './tasks'
import {getLineData, getPieData, getScatterData, getGraphTasks, getTaskStatementData} from "./graphs";

const app = express()
const port = 3000
configExpress(app);

/* gets all tasks for specified course */
app.get(['/api/tasks'], (req, res) => {
    const {course} = req.query;
    getTasks(course).then(dataObj => res.send(dataObj));
});
/* gets all tasks done for a student */
app.get(['/api/s/tasks/tasksDone'], (req, res)=>{
    const {course} = req.query;
    const email = req.session.email;
    getTasksDone(course, email).then(dataObj => res.send(dataObj));
});
/* remove task done for a student */
app.delete('/api/s/tasks/tasksDone', (req, res) => {
    const {taskID} = req.query;
    const email = req.session.email;
    deleteTaskDone(taskID, email).then(()=> res.send());
});
/* add task done for a student */
app.post('/api/s/tasks/tasksDone', (req, res) => {
    const {taskID} = req.body;
    const email = req.session.email;
    addTaskDone(taskID, email).then(errors=> res.send(errors));
});
// Invites students to the course.
app.post('/api/t/students', (req, res) => {
    const {invites, course} = req.body;
    const invitesWithTokens = invites.map(invite => {
        return {Email: invite, Username: hash({length: 16}), InviteStatus: "waiting"}
    })
    addStudentsToDB(invitesWithTokens, course).then(errors => res.send(errors));
});
// Gets a sorted and filtered subset of students in the course.
app.get('/api/t/students', ((req, res) => {
    const {offset, count, filters, course, sortState} = req.query;
    getStudentsFromDB({count, offset, course}, filters, sortState)
        .then(dataObj => res.send(dataObj));
}));
// Remove students from the course
app.delete('/api/t/students', (req, res) => {
    const {emails, course} = req.query;
    removeStudentFromDB(emails, course).then(() => res.send());
});

// Add students' grades.
app.put('/api/t/students/grade', (req, res) => {
    const {data, course} = req.body;
    setStudentGrades({data, course}).then(() => res.send());
});

// Get all student's deadlines, which were not completed yet.
app.get('/api/s/deadlines/all', (req, res) => {
    const {email} = req.session;
    getDeadlines(email).then(deadlines => res.send(deadlines));
});

// Get courses and related data for the student's dashboard.
app.get('/api/s/courses', ((req, res) => {
    const {email} = req.session;
    getCourses(email).then(courses => res.send(courses));
}));

// Get deadlines by course.
app.get('/api/s/deadlines', (req, res) => {
    const {email} = req.session;
    const {course} = req.query;
    getDeadlinesByCourse(email,course).then(deadlines => res.send(deadlines));
});

// Set student's confidence
app.post('/api/s/confidence', (req, res) => {
    const {email} = req.session;
    const {course, confidence} = req.body;
    setConfidence(course, email, confidence).then(() => res.send());
});

//Get student's confidence
app.get('/api/s/confidence', ((req, res) => {
    const {email} = req.session;
    const {course} = req.query;
    getConfidence(email, course).then(confidence => res.send({confidence}));
}));

//Registers a student into the system.
app.put('/api/register', (req, res) => {
    const data = req.body;
    registerStudent(data).then(errors => {
        if(isEmpty(errors)) {
            req.session.email = data.Email;
            req.session.role = "student";
            res.status(303).send("/");
        } else {
            res.send(errors)
        }
    });
});

// Logs in a user into the system.
app.get('/api/login',(req, res) => {
    const {username, password} = req.query;
    getStudent(username, password).then(email => {
        if(email) {
            req.session.email = email;
            req.session.role = "student";
            res.status(303).send("/");
        } else {
            getTeacher(username, password).then(email => {
                if(email) {
                    req.session.email = email;
                    req.session.role = "teacher";
                    res.status(303).send("/");
                } else {
                    res.send(false);
                }
            })
        }
    });
});
app.get(['/register/:token', '/register'], (req, res) => {
    const {token} = req.params;
    checkInviteToken(token).then(email =>
        res.render("register", {email: email ? email[0] : null,token}));
});

app.get('/login', (req, res) => {
    res.render("login");
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.status(303).send("/login");
});

app.get('/api/t/teachers',(req, res) => {
    const{email: email} = req.session;
    getTeacherData(email).then(data => res.send(data));
});

app.get('/api/s/student',(req,res) =>{
    const{email} = req.session;
    getStudentData(email).then(data => res.send(data));
});

// Endpoint for tasks complete.
app.get('/api/t/tasks', ((req, res) => {
    const {course, taskID, date} = req.query;
    getTaskStatementData(course, taskID, date).then(data => res.send(data));
}));

// Endpoint for pie chart.
app.get('/api/t/pie', ((req, res) => {
    const {course, filter, date} = req.query;
    getPieData(course, filter, date).then(data => res.send(data));
}));

// Endpoint for scatter chart.
app.get('/api/t/scatter', ((req, res) => {
    const {course, filter} = req.query;
    getScatterData(course, filter).then(data => res.send(data));
}));

// Endpoint for line chart.
app.get('/api/t/line', ((req, res) => {
    const {course, date} = req.query;
    getLineData(course, date).then(data => res.send(data));
}));

// Endpoint for getting tasks.
app.get('/api/t/droptasks', ((req, res) => {
    const {course} = req.query;
    getGraphTasks(course).then(data => res.send(data));
}));

app.get('*', (req, res) => {
    if(req.session.role === "teacher") {
        res.render("teacher");
    } else if(req.session.role === "student") {
        res.render("student");
    } else {
        res.redirect(303,"/login");
    }
});


/**
 * Configures the express app.
 * @param app
 */
function configExpress(app) {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.engine('.html', require('ejs').__express);
    app.set('views', path.join(__dirname, '../frontend/views'));
    app.set('view engine', 'html');
    app.use(express.json());
    app.use(session({
        secret:"777acfde385d77c06b83274bb4c50819",
        resave:false,
        saveUninitialized:false,
        store: new SessionStore()
    }));
    app.use("/api/t/", (req, res, next) => {
        if(req.session.role === "teacher") {
            next();
        } else {
            res.status(303).send("/login");
        }
    });
    app.use("/api/s/", (req, res, next) => {
        if(req.session.role === "student") {
            next();
        } else {
            res.status(303).send("/login");
        }
    });
    app.listen(port, () => {
        testDBConnection();
        console.log(`The app is listening at http://localhost`)
    })
}
function isEmpty(object) {
    return Object.keys(object).length === 0 && object.constructor === Object;
}