import React, { Component } from "react";
import "./scss/app.scss";
import Table from "./Table";
import NavBar from "./NavBar/NavBar";
import NavBar_Dropdown from "./NavBar/NavBar_Dropdown";
const App = () => {
    const course = "CSC2033";

    return (
        <div className="app">
            <NavBar course={course}/>
            <Table/>
        </div>
    );
}

export default App;