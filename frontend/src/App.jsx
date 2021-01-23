/**
 * @author Sofia Trevino
 */
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

/**
 * This component controls all of the teacher-view. The router holds the routes/paths to each of the pages available to
 * them.
 */

const App = () => {
    const pagePaths= [{link:<Link to="/" className="middle">HOME</Link>, path: "/"},
        {link:<Link to="/tasks" className="middle">TASKS</Link>, path: "/tasks"},
        {link:<Link to="/manage" className="middle">MANAGE</Link>, path: "/manage"}];
    const [currentOption, setCurrentOption] = useState({value: null, label: "COURSES"});

    return (
        <Router>
            <div className="app">
                <ToastContainer/>
                <NavBar currentOption={currentOption} setCurrentOption={setCurrentOption} pagePaths={pagePaths}
                        userRole="teacher"/>
                <Switch>
                    <Route path="/profile">
                    </Route>
                    <Route path="/manage">
                        <Table course={currentOption.value}/>
                    </Route>
                    <Route path="/tasks">
                    </Route>
                    <Route path="/home">
                        <Redirect to="/"/>
                    </Route>
                    <Route path="/">
                    </Route>
                </Switch>

            </div>
        </Router>
    );
}
export default App;