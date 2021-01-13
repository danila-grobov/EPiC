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
            <div className="dashboard">

                <ToastContainer/>

                <Route path="/dashboard">
                    <NavBar userRole={"student"}/>
                    <Calendar/>
                    <div className="dashboard__courseCards">
                        {courses.map(course =>
                            <CourseCard {...course}/>
                        )}
                    </div>
                </Route>

                <Route path="/">
                    <Redirect to="/dashboard"/>
                </Route>

            </div>
        </Router>
    )
}