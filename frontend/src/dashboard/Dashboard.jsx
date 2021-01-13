import React, {useState,useLayoutEffect} from "react"
import CourseCard from "./CourseCard";
import "../scss/app.scss";
import "../scss/dashboard/dashboard.scss";
import Calendar from "./Calendar";
import axios from "axios_redirect";
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
        <div className="dashboard">

            <Calendar />
            <div className="dashboard__courseCards">
                {courses.map(course =>
                    <CourseCard {...course}/>
                )}
            </div>
        </div>
    )
}