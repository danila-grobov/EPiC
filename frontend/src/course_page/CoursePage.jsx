import React from "react"
import CourseInfo from "./CourseInfo";
import "../scss/course_page/coursePage.scss";
import Deadlines from "./Deadlines";
import ConfidenceCard from "./ConfidenceCard";

export default props => {
    return (
        <div className="coursePage">
            <CourseInfo {...props} />
            <Deadlines {...props}/>
            <ConfidenceCard {...props} />
        </div>
    )
}