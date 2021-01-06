import React, {Component} from "react";
import "./scss/app.scss";
import Table from "./table/Table";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RegistrationPage from "./registration_page/RegistrationPage";
import NavBar from "./NavBar/NavBar";

const App = () => {
    const pages = ["HOME", "TASKS", "MANAGE"];
    const pagePaths = ["dsfasd", "./tasks.jsx", "./manage.jsx"];
    const name = "Hello, Dwight";

    //const [currentCourse, setCurrentCourse] = useState("CSC2033");
    //currentCourse={currentCourse} setCurrentCourse={setCurrentCourse}

    return (
        <div className="app">
            {/*<NavBar  pages={pages} pagePaths={pagePaths} name={name} adminRole={true}/>*/}
            {/*<Table course={"CSC2033"}/>*/}
            <RegistrationPage token={"f0c8231a0ad26d7d"}/>
            <ToastContainer />
        </div>
    );
}


export default App;