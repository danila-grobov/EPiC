import React from "react"
import "./scss/row.scss"
import checkBox from "./imgs/checkbox.svg"

export default props => {
    const {values, rowType} = props;
    const cells = values.map(({value, type}, index) => {
            const visibility = values.length-1 === index || type === "title" ? "hidden" : "";
            return [
                <span key={index} className={`row__cell row__cell--${type}`}>{value}</span>,
                <div className={`row__cellSeparator${visibility}`}/>
            ]
        }
    );
    return (
        <div className={`row--${rowType}`}>
            <img src={checkBox} alt="checkbox" className="row__cell--checkbox"/>
            {cells}
        </div>
    );
}