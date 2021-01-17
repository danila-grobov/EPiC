import React, {useState} from "react"
import "../scss/table/row.scss"
import checkbox from "../imgs/checkbox.svg"
import checkbox__checked from "../imgs/checkbox__checked.svg"
import checkbox__partial from "../imgs/checkbox_partial.svg"
import sort_up_active from "../imgs/sort_up_active.svg";
import sort_down_active from "../imgs/sort_down_active.svg";
import sort_up from "../imgs/sort_up.svg";
import sort_down from "../imgs/sort_down.svg";
export default props => {
    const {values, rowType, tickCheckbox, selected, sortState, setSortState} = props;
    const cells = values.map(({value, type}, index) => {
            const visibility = values.length - 1 === index || type === "title" ? "--hidden" : "";
            return [
                <span role={rowType === "header" ? "columnheader" : "cell"} key={"row_cell" + index}
                      className={`row__cell row__cell--${type}`}>
                    {value === null ? "--" : value}
                    {rowType === "header" ?
                        <div key={"row_cellSort" + index} className="row__sort" onClick={
                            () => setSortState({index, ascending:!sortState.ascending})
                        }>
                            {
                                sortState.index !== index ? [
                                <img key={"sort_up" + index} src={sort_up} alt="" className="row__sortIcon"/>,
                                <img key={"sort_down" + index} src={sort_down} alt="" className="row__sortIcon"/>
                                ] : sortState.index === index && sortState.ascending
                                ? <img key={"sort_down" + index} src={sort_down_active} alt="" className="row__sortIcon"/>
                                : sortState.index === index && !sortState.ascending
                                ? <img key={"sort_up" + index} src={sort_up_active} alt="" className="row__sortIcon"/>
                                : ""
                            }
                        </div>
                        : ""}
                </span>,
                <div key={"row__cellSeparator" + index} className={`row__cellSeparator${visibility}`}/>
            ]
        }
    );
    const visibility = rowType === "header" ? "--hidden" : "";
    let icon = checkbox;
    if (selected === "full")
        icon = checkbox__checked;
    else if (selected === "partial")
        icon = checkbox__partial
    return (
        <div className={`row--${rowType}`} role={"row"} aria-label={rowType === "header" ? "header row" : "table row"}>
            <img onClick={tickCheckbox} src={icon} alt="checkbox" className="row__cell--checkbox"/>
            <div className={`row__cellSeparator${visibility}`}/>
            {cells}
        </div>
    );
}