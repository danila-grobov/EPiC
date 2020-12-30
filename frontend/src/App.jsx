import React, { Component } from "react";
import "./scss/app.scss";
import Table from "./Table";
import NavBar from "./NavBar/NavBar";
import NavBar_Dropdown from "./NavBar/NavBar_Dropdown";
const App = () => {
    const pages = ["HOME", "TASKS", "MANAGE"];
    const name = "Hello, Dwight";

    //const [currentCourse, setCurrentCourse] = useState("CSC2033");
    //currentCourse={currentCourse} setCurrentCourse={setCurrentCourse}

    return (
        <div className="app">
            <NavBar  pages={pages} name={name} adminRole={false}/>
            <Table/>;
        </div>
    );
}


export default App;