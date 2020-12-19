import React from "react"
import "../scss/row.scss"
import checkbox from "../imgs/checkbox.svg"
import checkBox__checked from "../imgs/checkbox__checked.svg"
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
    return (
        <div className={`row--${rowType}`}>
            <img onClick={tickCheckbox} src={selected ? checkBox__checked : checkbox} alt="checkbox" className="row__cell--checkbox"/>
            <div className={`row__cellSeparator${visibility}`}/>
            {cells}
        </div>
    );
}