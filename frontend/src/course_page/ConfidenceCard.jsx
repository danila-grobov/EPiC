import React, {useState, useLayoutEffect} from "react";
import "../scss/course_page/confidenceCard.scss";
import Trackbar from "./Trackbar";
import Button from "../general_components/Button";
import axios from "axios_redirect";

export default ({course}) => {
    const [loadingState, setLoadingState] = useState("idle");
    const confidenceLevels = [
        "Very unconfident",
        "Unconfident",
        "Sort of confident",
        "Confident",
        "Very confident"
    ];
    const [selectedOption, setSelectedOption] = useState(2);
    useLayoutEffect(() => {
        axios.get('/api/s/confidence', {params: {course}})
            .then(({data}) => setSelectedOption(data.confidence));
    }, [course]);
    return (
        <div className="confidenceCard">
            <span className="confidenceCard__title">
                How confident are you feeling with the course today?
            </span>
            <div className="confidenceCard__selectedOption">
                {confidenceLevels[selectedOption]}
            </div>
            <Trackbar selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
            <Button type={"secondary"} label={"SUBMIT"} height={40} width={175}
                    className={"confidenceCard__submitButton"}
                    status={loadingState}
                    loadingColor={"grey"}
                    onClick={
                        () => {
                            setLoadingState("loading");
                            axios.post('/api/s/confidence', {
                                    confidence: selectedOption,
                                    course
                                }
                            ).then(() => {
                                setTimeout(() => setLoadingState("done"), 500);
                                setTimeout(() => setLoadingState("idle"), 1500);
                            })
                        }}/>
        </div>
    );
}