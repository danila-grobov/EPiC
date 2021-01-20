import React, {useEffect, useState} from "react";
import "./scss/app.scss";
import Table from "./table/Table";
import NavBar from "./NavBar/NavBar";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

//Controls the teacher-view.

const App = () => {
    const pagePaths= [{link:<Link to="/home" className="middle">HOME</Link>, path: "/home"},
        {link:<Link to="/tasks" className="middle">TASKS</Link>, path: "/tasks"},
        {link:<Link to="/manage" className="middle">MANAGE</Link>, path: "/manage"}];
    const [currentOption, setCurrentOption] = useState({value: null, label: "COURSES"});

    return (
        <Router>
            <div className="app">

                <ToastContainer/>
                    <Route path="/profile">
                        <NavBar currentOption={currentOption} setCurrentOption={setCurrentOption} pagePaths={pagePaths}
                                userRole="teacher"/>
                    </Route>

                    <Route path="/manage">
                        <NavBar currentOption={currentOption} setCurrentOption={setCurrentOption} pagePaths={pagePaths}
                                userRole="teacher"/>
                        <Table course={currentOption.value}/>
                    </Route>

                    <Route path="/tasks">
                        <NavBar currentOption={currentOption} setCurrentOption={setCurrentOption} pagePaths={pagePaths}
                                userRole="teacher"/>
                    </Route>

                    <Route path="/home">
                        <NavBar currentOption={currentOption} setCurrentOption={setCurrentOption} pagePaths={pagePaths}
                                userRole="teacher"/>
                    </Route>

                    <Route path="/">
                        <Redirect to="/home"/>
                    </Route>



            </div>
        </Router>
    );
}


export default App;