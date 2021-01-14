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


const App = () => {
    const pagePaths= [<Link to="/home">HOME</Link>,
        <Link to="/tasks">TASKS</Link>,
        <Link to="/manage">MANAGE</Link>];
    const [currentOption, setCurrentOption] = useState({value: null, label: "COURSES"});


    return (
        <Router>
            <div className="app">

                <ToastContainer/>
                    <Route path="/profile">
                        <NavBar pagePaths={pagePaths} currentOption={currentOption} setCurrentOption={setCurrentOption} userRole={"teacher"}/>
                    </Route>

                    <Route path="/manage">
                        <NavBar pagePaths={pagePaths} currentOption={currentOption} setCurrentOption={setCurrentOption} userRole={"teacher"}/>
                        <Table course={currentOption.value}/>
                    </Route>

                    <Route path="/tasks">
                        <NavBar pagePaths={pagePaths} currentOption={currentOption} setCurrentOption={setCurrentOption} userRole={"teacher"}/>
                    </Route>

                    <Route path="/home">
                        <NavBar pagePaths={pagePaths} currentOption={currentOption} setCurrentOption={setCurrentOption} userRole={"teacher"}/>
                    </Route>

                    <Route path="/">
                        <Redirect to="/home"/>
                    </Route>



            </div>
        </Router>
    );
}


export default App;