/**
 * @author Danila Grobov, Sofia Trevino
 */
import React from "react"
import ProgressBar from "./ProgressBar";
import "../scss/dashboard/courseCard.scss";
import {useHistory} from "react-router";

/**
 * Displays a card with course information.
 */
export default props => {
    const {progress, name, color} = props;
    const history = useHistory();
    return (
        <div className="courseCard" onClick={() =>
            history.push(`/coursePage/${name}`)}>
            <span className="courseCard__courseName" style={{color}}>{name}</span>
            <ProgressBar className={"courseCard__progress"} progress={progress} color={color}/>
        </div>
    )
}