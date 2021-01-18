import React from "react"
import ProgressBar from "../dashboard/ProgressBar";
import "../scss/course_page/courseInfo.scss";

export default props => {
    const {name, fullCourseName, progress, color} = props;
    return (
        <div className="courseInfo">
            <span className="courseInfo__courseName" style={{color}}>{name}</span>
            <span className="courseInfo__fullCourseName" style={{color}}>{fullCourseName}</span>
            <ProgressBar size={28} progress={progress} className={"courseInfo__progress"} color={color}/>
        </div>
    )
}