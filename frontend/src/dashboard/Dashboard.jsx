import React, {useState,useLayoutEffect} from "react"
import CourseCard from "./CourseCard";
import "../scss/app.scss";
import "../scss/dashboard/dashboard.scss";
import Calendar from "./Calendar";
import NavBar from "../NavBar/NavBar";
import {ToastContainer} from 'react-toastify';
import axios from "axios_redirect";
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
export default () => {
    const [courses, setCourses] = useState([]);
    useLayoutEffect(() => {
            axios
                .get("/api/s/courses")
                .then(({data:courses}) =>
                    setCourses(courses)
                )
    }
    ,[]);
    return (
        <Router>

            <ToastContainer/>

            <div className="dashboard">

                <Route path="/home">
                    <NavBar className="navwidth" userRole={"student"}/>
                    <Calendar/>
                    <div className="dashboard__courseCards">
                        {courses.map(course =>
                            <CourseCard {...course}/>
                        )}
                    </div>
                </Route>

                <Route path="/profile">
                    
                    <NavBar className="navwidth" userRole={"student"}/>
                    
                </Route>

                <Route path="/">
                    <Redirect to="/home"/>
                </Route>

            </div>
        </Router>
    )
}