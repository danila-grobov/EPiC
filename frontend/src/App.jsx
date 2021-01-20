import React, {useState} from "react";
import "./scss/app.scss";
import Courses from './task_view/Courses';
import Tasks from './task_view/Tasks';
import NavBar from "./NavBar/NavBar";
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';

const App = () =>{
    const [course, setCourse] = useState("Select Course");
    const [user, setUser] = useState("student"); // for now select manually between 'student' and 'teacher'
    const pages = ["HOME", "TASKS", "MANAGE"];
    const pagePaths = ["dsfasd", "./tasks.jsx", "./manage.jsx"];
    const name = "Hello, Dwight";

    return(
        <div className="app">
            <NavBar  pages={pages} pagePaths={pagePaths} name={name} adminRole={false}/>
            <Courses course={course} setCourse={setCourse}/>
            <Tasks course={course} user={user}/>
        </div>
    );
}
export default App;