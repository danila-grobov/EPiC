import React, {useEffect, useState} from "react";
import "./scss/app.scss";
import Table from "./table/Table";
import NavBar from "./NavBar/NavBar";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


const App = () => {
    const pagePaths= [<Link to="/home">HOME</Link>,
        <Link to="/tasks">TASKS</Link>,
        <Link to="/manage">MANAGE</Link>];
    const studentPagePaths = [<Link to="/home">HOME</Link>];
    const teacherRole = false;


    return (
        <Router>
            <div className="app">

                    <Route path="/profile">
                        <NavBar pagePaths={pagePaths} name={name} teacherRole={teacherRole}/>
                    </Route>

                    <Route path="/manage">
                        <NavBar pagePaths={pagePaths} name={name} teacherRole={teacherRole}/>
                        <Table course={"CSC2033"}/>
                    </Route>

                    <Route path="/tasks">
                        <NavBar pagePaths={pagePaths} name={name} teacherRole={teacherRole}/>
                    </Route>

                    <Route path="/home">
                        <NavBar pagePaths={pagePaths} name={name} teacherRole={teacherRole}/>
                    </Route>

                    <Route path="/">
                        <Redirect to="/home"/>
                    </Route>



                <ToastContainer/>
            </div>
        </Router>
    );
}


export default App;