import express from "express";
import path from "path";
import hash from "crypto-random-string";
import {addStudentsToDB, getStudentsFromDB, removeStudentFromDB, setStudentGrades} from "./students";
import {getTeacherName} from "./teachers";
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

app.get('*', (req, res) => {
    res.render('index');
});

app.get('/api/t/teachers',(req, res) => {
    const{email} = req.session;
    getTeacherName(email).then(firstName => res.send(firstName));

})

function configExpress(app) {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.engine('.html', require('ejs').__express);
    app.set('views', path.join(__dirname, '../frontend/views'));
    app.set('view engine', 'html');
    app.use(express.json());
    app.listen(port, () => {
        testDBConnection();
        console.log(`The app is listening at http://localhost`)
    })
}