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
    Link,
    Redirect
} from "react-router-dom";

const App = () => {
    const pagePaths = [<Link to="/home">HOME</Link>,
        <Link to="/tasks">TASKS</Link>,
        <Link to="/manage">MANAGE</Link>];
    const name = "Hello, Dwight";

    //const [currentCourse, setCurrentCourse] = useState("CSC2033");
    //currentCourse={currentCourse} setCurrentCourse={setCurrentCourse}

    return (
        <Router>
            <div className="app">

                    <Route path="/profile">
                        <NavBar pagePaths={pagePaths} name={name} adminRole={false}/>
                    </Route>

                    <Route path="/manage">
                        <NavBar pagePaths={pagePaths} name={name} adminRole={false}/>
                        <Table course={"CSC2033"}/>
                    </Route>

                    <Route path="/tasks">
                        <NavBar pagePaths={pagePaths} name={name} adminRole={false}/>
                    </Route>

                    <Route path="/home">
                        <NavBar pagePaths={pagePaths} name={name} adminRole={false}/>
                    </Route>

                    <Route path="/">
                        <Redirect to="/home"/>
                    </Route>



                <ToastContainer/>
            </div>
        </Router>
    );
}


export default App;