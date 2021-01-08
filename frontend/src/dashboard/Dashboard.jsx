import React, {} from "react"
import CourseCard from "./CourseCard";
import "../scss/app.scss";
import "../scss/dashboard/dashboard.scss";
import Calendar from "./Calendar";
export default () => {
    const courses = [
        {
            name: "CSC2031",
            color: "#F28F38",
            progress: 25
        },
        {
            name: "CSC2032",
            color: "#F28F38",
            progress: 50
        },
        {
            name: "CSC2033",
            color: "#7A306C",
            progress: 12,
        },
        {
            name: "CSC2034",
            color: "#C8553D",
            progress: 0
        },
        {
            name: "CSC2035",
            color: "#7A306C",
            progress: 99
        },
        {
            name: "CSC2035",
            color: "#7A306C",
            progress: 99
        },
        {
            name: "CSC2035",
            color: "#7A306C",
            progress: 99
        }
    ]
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