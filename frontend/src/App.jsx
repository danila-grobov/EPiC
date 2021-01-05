import React, { Component } from "react";
import "./scss/app.scss";
import Table from "./table/Table";
import NavBar from "./NavBar/NavBar";
import NavBar_Dropdown from "./NavBar/NavBar_Dropdown";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    const pages = ["HOME", "TASKS", "MANAGE"];
    const pagePaths = ["./index.jsx", "./tasks.jsx", "./manage.jsx"];
    const name = "Hello, Dwight";

    //const [currentCourse, setCurrentCourse] = useState("CSC2033");
    //currentCourse={currentCourse} setCurrentCourse={setCurrentCourse}

    return (
        <div className="app">
            <NavBar  pages={pages} pagePaths={pagePaths} name={name} adminRole={true}/>
            <Table course={"CSC2033"}/>
            <ToastContainer />
        </div>
    );
}


export default App;