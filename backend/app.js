import express from "express";
import path from "path";
import hash from "crypto-random-string";
import cookieParser from "cookie-parser";
import session from "express-session";
import {
    addStudentsToDB,
    checkInviteToken, getStudent,
    getStudentsFromDB,
    registerStudent,
    removeStudentFromDB,
    setStudentGrades
} from "./students";
import {testDBConnection} from "./database";
import {getTeacher} from "./teacher";
import {getTasks} from './tasks'

const app = express()
const port = 3000
configExpress(app);

/* gets all tasks for specified course */
app.get(['/api/tasks'], (req, res) => {
    const {course} = req.query;
    console.log(course);
    getTasks(course).then(dataObj => res.send(dataObj));
})




app.post('/api/t/students', (req, res) => {
    const {invites, course} = req.body;
    const invitesWithTokens = invites.map(invite => {
        return {Email: invite, Username: hash({length: 16}), InviteStatus: "waiting"}
    })
    addStudentsToDB(invitesWithTokens, course).then(errors => res.send(errors));
})
app.get('/api/t/students', ((req, res) => {
    const {offset, count, filters, course} = req.query;
    getStudentsFromDB({count, offset, course}, filters)
        .then(dataObj => res.send(dataObj));
}))
app.delete('/api/t/students', (req, res) => {
    const {emails = []} = req.query;
    removeStudentFromDB(emails).then(() => res.send());
})
app.put('/api/t/students/grade', (req, res) => {
    const {data, course} = req.body;
    setStudentGrades({data, course}).then(() => res.send());
})
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
})
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
})
app.get(['/register/:token', '/register'], (req, res) => {
    const {token} = req.params;
    checkInviteToken(token).then(email =>
        res.render("register", {email: email ? email[0] : null,token}));
})
app.get('/login', (req, res) => {
    res.render("login");
});
app.get('*', (req, res) => {
    if(req.session.role === "teacher") {
        res.render("teacher");
    } else if(req.session.role === "student") {
        res.render("student");
    } else {
        res.redirect(303,"/login");
    }
});

function configExpress(app) {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.engine('.html', require('ejs').__express);
    app.set('views', path.join(__dirname, '../frontend/views'));
    app.set('view engine', 'html');
    app.use(express.json());
    app.use(cookieParser());
    app.use(session({secret:"777acfde385d77c06b83274bb4c50819",resave:false,saveUninitialized:false}));
    app.use("/api/t/", (req, res, next) => {
        if(req.session.role === "teacher") {
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