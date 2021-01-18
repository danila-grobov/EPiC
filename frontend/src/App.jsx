import "./scss/app.scss";
import React from "react";
import TeacherPage from "./teacher_page/TeacherPage";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar_Dropdown from "./NavBar/NavBar_Dropdown";
import Dropdown from "./general_components/Dropdown";
import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

const App = () => {
    // const pagePaths= [<Link to="/home">HOME</Link>,
    //     <Link to="/tasks">TASKS</Link>,
    //     <Link to="/manage">MANAGE</Link>];

    return (
        <div className="app">
            {/*<NavBar pages={pages} name={name} pagePaths={pagePaths} adminRole={false}/>*/}
            <TeacherPage />

        </div>
    );
}


export default App;