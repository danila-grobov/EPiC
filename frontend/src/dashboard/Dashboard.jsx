import React, {useState,useLayoutEffect} from "react"
import CourseCard from "./CourseCard";
import "../scss/app.scss";
import "../scss/dashboard/dashboard.scss";
import Calendar from "./Calendar";
import axios from "axios_redirect";
import CoursePage from "../course_page/CoursePage";
export default () => {
    const [courses, setCourses] = useState([]);
    const [currentCourse, setCurrentCourse] = useState(null);
    useLayoutEffect(() => {
            axios
                .get("/api/s/courses")
                .then(({data:courses}) =>
                    setCourses(courses)
                )
    }
    ,[]);
    if(currentCourse === null)
        return (
            <div className="dashboard">
                <Calendar />
                <div className="dashboard__courseCards">
                    {courses.map((course,index) =>
                        <CourseCard key={`courseCard__${index}`} {...course} onClick={() => setCurrentCourse(course)}/>
                    )}
                </div>
            </div>
        )
    else return <CoursePage {...currentCourse} />
}