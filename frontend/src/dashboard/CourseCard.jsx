import React from "react"
import ProgressBar from "./ProgressBar";
import "../scss/dashboard/courseCard.scss";
export default props => {
    const {progress, name, color} = props;
    return (
        <div className="courseCard">
            <span className="courseCard__courseName" style={{color}}>{name}</span>
            <ProgressBar className={"courseCard__progress"} progress={progress} color={color}/>
        </div>
    )
}