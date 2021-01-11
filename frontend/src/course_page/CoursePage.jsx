import React from "react"
import CourseInfo from "./CourseInfo";
import "../scss/course_page/coursePage.scss";

export default props => {
    return (
        <div className="coursePage">
            <CourseInfo {...props} />
        </div>
    )
}