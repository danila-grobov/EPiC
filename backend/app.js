import express from "express";
import mysqlx from "@mysql/xdevapi";
import path from "path";

const app = express()
const port = 3000
const dbCredentials = {
    user: 'root',
    password: 'password',
    host: 'db',
    port: '33060'
};
configExpress(app);

app.get('/', (req, res) => {
    res.render('index');
});

function configExpress(app) {
    app.use(express.static(path.join(__dirname, '../dist')));
    app.engine('.html', require('ejs').__express);
    app.set('views', path.join(__dirname, '../frontend/views'));
    app.set('view engine', 'html');
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
