import React, {useEffect} from "react"
import CourseInfo from "./CourseInfo";
import "../scss/course_page/coursePage.scss";
import Deadlines from "./Deadlines";
import ConfidenceCard from "./ConfidenceCard";
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
import {useParams} from "react-router";
import TasksStudent from "../task_view/student/TasksStudent";

export default props => {
    const {courses} = props;
    const {course:courseName} = useParams()
    const currentCourse = courses.find((course) => course.name === courseName);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="coursePage">
            <CourseInfo {...currentCourse} />
            <Deadlines {...currentCourse}/>
            <ConfidenceCard {...currentCourse} />
            <TasksStudent course={courseName}/>
        </div>
    )
}