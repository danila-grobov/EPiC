import React, {useState} from "react";
import "../scss/course_page/confidenceCard.scss";
import Slider from "./Slider";
import Button from "../general_components/Button";

export default () => {
    const confidenceLevels = [
        "Very unconfident",
        "Unconfident",
        "Sort of confident",
        "Confident",
        "Very confident"
    ]
    const [selectedOption, setSelectedOption] = useState(2);
    return (
        <div className="confidenceCard">
            <span className="confidenceCard__title">
                How confident are you feeling with the course today?
            </span>
            <div className="confidenceCard__selectedOption">
                {confidenceLevels[selectedOption]}
            </div>
            <Slider selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
            <Button type={"secondary"} label={"SUBMIT"} height={40} width={175}
                    className={"confidenceCard__submitButton"}/>
        </div>
    );
}