import express from "express"
import mysqlx from "@mysql/xdevapi"
const app = express()
const port = 3000
const dbCredentials = {
    user: 'root',
    password: 'password',
    host: 'db',
    port: '33060'
};
app.get('/', (req, res) => {
    res.send('Hello World!')
})
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
