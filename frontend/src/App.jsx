import React, { Component } from "react";
import "./scss/app.scss";
import Table from "./table/Table";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationPage from "./registration_page/RegistrationPage";
import NavBar from "./NavBar/NavBar";

const App = () => {
    const pages = ["HOME", "TASKS", "MANAGE"];
    const pagePaths = ["./index.jsx", "./tasks.jsx", "./manage.jsx"];
    const name = "Hello, Dwight";
    return (
        <div className="app">
            <NavBar  pages={pages} pagePaths={pagePaths} name={name} adminRole={true}/>
            <Table course={"CSC2033"}/>
            <RegistrationPage token={"8682f97e26b859fc"}/>
            <ToastContainer />
        </div>
    );
}


export default App;