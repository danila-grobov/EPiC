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

// Expose a folder to the web, this folder will be accessible from outside.
app.use(express.static(path.join(__dirname, '../dist')));
// Setup a render engine to be used on .html files
// Ejs allows us to make page templates with js
app.engine('.html', require('ejs').__express);
// Specify a folder, where the views will be stored
app.set('views', path.join(__dirname, '../frontend/views'));
// Provide an extension to use for views, so we won't have to specify it when rendering.
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.render('index');
});

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
