import React, { Component } from "react";
import "./scss/app.scss";
import Table from "./Table";
import NavBar from "./NavBar/NavBar";
import NavBar_Dropdown from "./NavBar/NavBar_Dropdown";
const App = () => {
    const course = "CSC2033";
    const epic = "EPiC";
    const pages = ["HOME", "TASKS", "MANAGE"];
    const name = "Hello, Dwight";
    const teacher = "TEACHER";
    const admin = "ADMIN";


    return (
        <div className="app">
            <NavBar course={course} epic={epic} pages={pages} name={name} teacher={teacher} admin={admin}/>
            <Table/>;
        </div>
    );
}


export default App;