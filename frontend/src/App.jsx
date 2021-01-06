import React, {Component} from "react";
import "./scss/app.scss";
import Table from "./table/Table";
import NavBar from "./NavBar/NavBar";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const App = () => {
    const pages = ["HOME", "TASKS", "MANAGE"];
    const pagePaths = [<Link to="/">HOME</Link>, "./tasks.jsx", "./manage.jsx"];
    const name = "Hello, Dwight";

    //const [currentCourse, setCurrentCourse] = useState("CSC2033");
    //currentCourse={currentCourse} setCurrentCourse={setCurrentCourse}

    return (
        <Router>
            <div className="app">

                <Switch>
                    <Route path="/">
                        <NavBar pages={pages} pagePaths={pagePaths} name={name} adminRole={false}/>
                        <Table course={"CSC2033"}/>
                    </Route>

                    <Route path="/tasks">


                    </Route>

                </Switch>

                <ToastContainer/>
            </div>
        </Router>
    );
}


export default App;