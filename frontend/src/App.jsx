import React, { Component } from "react";
import "./scss/app.scss";
import Table from "./table_components/Table";
import {ToastContainer } from 'react-toastify';
const App = () => {
    return (
        <div className="app">
            <Table/>
            <ToastContainer />
        </div>
    );
}
export default App;