import React, { Component } from "react";
import "./scss/app.scss";
import Table from "./Table";
import NavBar from "./NavBar/NavBar";
import NavBar_Dropdown from "./NavBar/NavBar_Dropdown";
const App = () => {
    const courses = ["CSC2031","CSC2032","CSC2033","CSC2034","CSC2035"];
    const epic = "EPiC";
    const pages = ["HOME", "TASKS", "MANAGE"];
    const name = "Hello, Dwight";
    const adminRole = true;
    const teacher = "TEACHER";
    const admin = "ADMIN";



    return (
        <div className="app">
            <NavBar course={courses} epic={epic} pages={pages} name={name} adminRole={adminRole}
                    teacher={teacher} admin={admin}/>
            <Table/>;
        </div>
    );
}


export default App;