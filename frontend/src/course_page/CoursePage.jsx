/**
 * @author Danila Grobov
 */
import React, {useEffect} from "react";
import CourseInfo from "./CourseInfo";
import "../scss/course_page/coursePage.scss";
import Deadlines from "./Deadlines";
import ConfidenceCard from "./ConfidenceCard";
import {useParams} from "react-router";
import TasksStudent from "../task_view/student/TasksStudent";

/**
 * Component, which displays student's course data.
 */
export default props => {
    const {courses} = props;
    const {course:courseName} = useParams();
    const currentCourse = courses.find((course) => course.name === courseName);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="coursePage">
            <CourseInfo {...currentCourse} />
            <Deadlines course={courseName} />
            <ConfidenceCard course={courseName} />
            <TasksStudent course={courseName}/>
        </div>
    );
};