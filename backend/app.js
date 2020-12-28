import express from "express";
import path from "path";
import hash from "crypto-random-string";
import {addStudentsToDB, getStudentsFromDB, removeStudentFromDB, setStudentGrades} from "./students";
import {testDBConnection} from "./database";

const app = express()
const port = 3000
configExpress(app);

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/api/students', (req, res) => {
    const {invites, course} = req.body;
    const invitesWithTokens = invites.map(invite => {
        return {Email: invite, Username: hash({length: 16}), InviteStatus: "waiting"}
    })
    addStudentsToDB(invitesWithTokens, course).then(error => {
        if(error) res.send(false)
        else res.send(true)
    });
})
app.get('/api/students', ((req, res) => {
    const {offset, count, filters, course} = req.query;
    getStudentsFromDB({count, offset, course}, filters)
        .then(dataObj => res.send(dataObj));
}))
app.delete('/api/students', (req, res) => {
    const {usernames = []} = req.query;
    removeStudentFromDB(usernames).then(() => res.send());
})
app.put('/api/students/grade', (req, res) => {
    const {data,course} = req.body;
    setStudentGrades({data,course}).then(() => res.send());
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