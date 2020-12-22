import React, { Component } from "react";
import "./scss/app.scss";
import Table from "./table_components/Table";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
    return (
        <div className="app">
            <Table/>
            <ToastContainer />
        </div>
    );
}
export default App;