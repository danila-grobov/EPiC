import React, {useEffect, useState} from "react";
import "./scss/app.scss";
import Table from "./table/Table";
import NavBar from "./NavBar/NavBar";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PieGraph from "./graphs/PieGraph";
import ScatterGraph from "./graphs/ScatterGraph";
import LineGraph from "./graphs/LineGraph";
import NavBar from "./NavBar/NavBar";
import NavBar_Dropdown from "./NavBar/NavBar_Dropdown";
import FilterDropdown from "./graphs/FilterDropdown";


import axios from "axios";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";


const App = () => {
    const pagePaths= [<Link to="/home">HOME</Link>,
        <Link to="/tasks">TASKS</Link>,
        <Link to="/manage">MANAGE</Link>];



    return (
        <div className="app">
            <NavBar  pages={pages} name={name} adminRole={false}/>

            <div className="flex-item-full">
                <p1>Today's Insight</p1>
                <h1>“80% of advanced ability students are feeling low confidence levels this week”</h1>
            </div>

            <div className="flex-container">
                <div className="flex-item-half">
                    <FilterDropdown />
                    <FilterDropdown />
                    <PieGraph data={[10, 30, 80, 110, 9]} />
                </div>
                <div className="flex-item-half">
                    <FilterDropdown />
                    <FilterDropdown />
                    <h1>Some number / Some other number</h1>
                </div>

                <div className="flex-item-full">
                    <FilterDropdown />
                    <ScatterGraph
                        ukXVals={[1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,4,4,5,5,5,5]} ukYVals={[10,15,40,20,29,60,54,43,54,65,38,58,62,70,75,67,80,45,89,91,100]}
                        euXVals={[1,2,2,2,2,3,3,4,4,4,4,4,4,5,5,5,5,5,5]} euYVals={[20,28,39,48,45,49,41,56,68,81,50,47,42,90,87,99,72,79,72]}
                        inXVals={[2,2,3,3,3,4,4,4,4,4,4,4,5,5,5,5,5]} inYVals={[45,34,47,39,43,69,76,68,56,80,72,78,90,98,84,77,100]} />
                </div>
                <div className="flex-item-full">
                    <FilterDropdown />
                    <LineGraph title={'Average Confidence'}
                               labels={['28/12/2020', '29/12/2020', '30/12/2020', '31/12/2020', '01/01/2021', '04/01/2021', '05/01/2021', '06/01/2021', '07/01/2021', '08/01/2021']}
                               values={[2.2, 4.1, 3.9, 1.2, 2, 3.3, 1.5, 3.5, 4.2, 4.5]} />
                </div>
            </div>


            <ToastContainer />
        </div>
    );
}


export default App;