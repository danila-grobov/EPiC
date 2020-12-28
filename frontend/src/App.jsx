import React, { Component } from "react";
import "./scss/app.scss";
import Table from "./table/Table";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// App stores and displays all of the top level components in the page.
// ToastContainer is need to display alert messages.
const App = () => {
    return (
        <div className="app">
            <Table course={"CSC2033"}/>
            <ToastContainer />
        </div>
    );
}
export default App;