import React from "react"
import "../scss/row.scss"
import checkbox from "../imgs/checkbox.svg"
import checkbox__checked from "../imgs/checkbox__checked.svg"
import checkbox__partial from "../imgs/checkbox_partial.svg"
export default props => {
    const {values, rowType,tickCheckbox,selected,id} = props;
    const cells = values.map(({value, type}, index) => {
            const visibility = values.length-1 === index || type === "title" ? "--hidden" : "";
            return [
                <span key={index} className={`row__cell row__cell--${type}`}>{value}</span>,
                <div className={`row__cellSeparator${visibility}`}/>
            ]
        }
    );
    const visibility = rowType === "header" ? "--hidden" : "";
    let icon = checkbox;
    if(selected === "full")
        icon = checkbox__checked;
    else if(selected === "partial")
        icon = checkbox__partial
    return (
        <div className={`row--${rowType}`}>
            <img onClick={tickCheckbox} src={icon} alt="checkbox" className="row__cell--checkbox"/>
            <div className={`row__cellSeparator${visibility}`}/>
            {cells}
        </div>
    );
}