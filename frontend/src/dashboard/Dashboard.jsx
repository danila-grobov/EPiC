/**
 * @author Sofia Trevino, Danila Grobov
 */
import React, {useState,useEffect} from "react"
import CourseCard from "./CourseCard";
import "../scss/app.scss";
import "../scss/dashboard/dashboard.scss";
import Calendar from "./Calendar";
import NavBar from "../NavBar/NavBar";
import {ToastContainer} from 'react-toastify';
import axios from "axios_redirect";
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from "react-router-dom";
import CoursePage from "../course_page/CoursePage";

/**
 * This component controls all of thr student view. The router holds the routes/paths to each of the pages available to
 * them. The routes include paths to profile page, and the home page which contains the calendar and course cards.
 *
 */

export default () => {
    const [courses, setCourses] = useState([]);
    const pagePaths = [{link:<Link to="/home" className="middle">HOME</Link>, path: "/home"}];

    //retrieves courses that the current student is enrolled in.
    useEffect(() => {
        axios
            .get("/api/s/courses")
            .then(({data:courses}) =>
                setCourses(courses)
            )
    },[]);
    return (
        <Router>
            <ToastContainer/>
            <div className="dashboard">
                <NavBar className="navwidth" userRole={"student"} pagePaths={pagePaths}/>
                <Switch>
                    <Route path="/profile">
                    </Route>
                    <Route path="/coursePage/:course">
                        <CoursePage courses={courses}/>
                    </Route>
                    <Route path="/home">
                        <Redirect to={"/"} />
                    </Route>
                    <Route path="/">
                        <Calendar/>
                        <div className="dashboard__courseCards">
                            {courses.map((course,index) =>
                                <CourseCard key={`courseCard__${index}`} {...course} />
                            )}
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    )

}