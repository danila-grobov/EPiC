import express from "express";
import mysqlx from "@mysql/xdevapi";
import path from "path";
import hash from "crypto-random-string";
import mailer from "nodemailer";

const app = express()
const port = 3000
const dbCredentials = {
    user: 'root',
    password: 'password',
    host: 'db',
    port: '33060'
};
const emailCredentials = {
    user: "",
    pass: ""
}
const domainName = "http://localhost/";
const emailTransporter = mailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: emailCredentials
});
configExpress(app);

app.get('/', (req, res) => {
    res.render('index');
});
app.post('/api/students', (req, res) => {
    const invites = req.body;
    const invitesWithTokens = invites.map(invite => {
        return {Email: invite, Username: hash({length: 16}), InviteStatus: "waiting"}
    })
    sendDataToDB("Students", invitesWithTokens).then(() => res.send());
})

function configExpress(app) {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.engine('.html', require('ejs').__express);
    app.set('views', path.join(__dirname, '../frontend/views'));
    app.set('view engine', 'html');
    app.use(express.json());
    app.listen(port, () => {
        mysqlx
            .getSession(dbCredentials)
            .then(session => {
                console.log("Connected!");
            })
            .catch(err => {
                console.log(err)
            });
        console.log(`The app is listening at http://localhost`)
    })
}

function sendDataToDB(tableName, data) {
    return mysqlx
        .getSession(dbCredentials)
        .then(session => {
            const table = session.getSchema("EPiC").getTable(tableName);
            return Promise.all(data.map(element => {
                table
                    .insert(Object.keys(element))
                    .values(Object.values(element))
                    .execute();
                return emailMessage(domainName + "register/" + element.Username, element.Email);
            }));
        })
        .catch(err => {
            console.log(err)
        });
}

function emailMessage(message, email) {
    return new Promise((resolve, reject) =>
        emailTransporter.sendMail({
            from: emailCredentials.user,
            to: email,
            subject: "Your registration link",
            text: message
        },(err,info) => err ? reject(err) : resolve(info)));
}