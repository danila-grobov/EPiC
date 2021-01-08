import React from "react"
import "../scss/dashboard/progressBar.scss";

export default props => {
    const {progress, className, color} = props;
    const numberOfDots = 17;
    const numberOfFilledDots = Math.trunc(progress * numberOfDots / 100);
    const dots = [...Array(numberOfDots).keys()].map(dotNumber =>
        <div className={
            `progressBar__dot--size-8${dotNumber+1 > numberOfFilledDots ? " progressBar__dot--empty" : ""}`
        } style={{backgroundColor:color}}/>
    )
    return (
        <div className={"progressBar " + className}>
            {dots}
        </div>
    )
}