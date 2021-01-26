/**
 * @author Danila Grobov
 */
import React from "react";
import "../scss/dashboard/progressBar.scss";

/**
 * Displays a progressbar for the course.
 */
export default props => {
    const {progress, className, color, size = 8} = props;
    const numberOfDots = 17;
    const numberOfFilledDots = Math.trunc(progress * numberOfDots / 100);
    const dots = [...Array(numberOfDots).keys()].map(dotNumber =>
        <div key={`progressDot__${dotNumber}`} className={
            `progressBar__dot--size-${size}${dotNumber + 1 > numberOfFilledDots ? " progressBar__dot--empty" : ""}`
        } style={{backgroundColor: color}}/>
    );
    return (
        <div className={"progressBar " + className} style={{columnGap:size / 4}}>
            {dots}
        </div>
    );
};