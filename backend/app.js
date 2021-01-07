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

const app = express()
const port = 3000
configExpress(app);


app.post('/api/students', (req, res) => {
    const {invites, course} = req.body;
    const invitesWithTokens = invites.map(invite => {
        return {Email: invite, Username: hash({length: 16}), InviteStatus: "waiting"}
    })
    addStudentsToDB(invitesWithTokens, course).then(errors => res.send(errors));
})
app.get('/api/students', ((req, res) => {
    const {offset, count, filters, course} = req.query;
    getStudentsFromDB({count, offset, course}, filters)
        .then(dataObj => res.send(dataObj));
}))
app.delete('/api/students', (req, res) => {
    const {emails = []} = req.query;
    removeStudentFromDB(emails).then(() => res.send());
})
app.put('/api/students/grade', (req, res) => {
    const {data, course} = req.body;
    setStudentGrades({data, course}).then(() => res.send());
})
app.put('/api/students', (req, res) => {
    const data = req.body;
    registerStudent(data).then(errors => {
        if(isEmpty(errors)) {
            req.session.email = data.Email;
            req.session.role = "student";
        }
        res.send(errors)
    });
})
app.get('/api/student/login',(req, res) => {
    const {username, password} = req.query;
    getStudent(username, password).then(success => res.send(success));
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
    res.render("teacher");
});

function configExpress(app) {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.engine('.html', require('ejs').__express);
    app.set('views', path.join(__dirname, '../frontend/views'));
    app.set('view engine', 'html');
    app.use(express.json());
    app.use(cookieParser());
    app.use(session({secret:"777acfde385d77c06b83274bb4c50819",resave:false,saveUninitialized:false}));
    app.listen(port, () => {
        testDBConnection();
        console.log(`The app is listening at http://localhost`)
    })
}
function isEmpty(object) {
    return Object.keys(object).length === 0 && object.constructor === Object;
}