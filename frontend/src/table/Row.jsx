/**
 * @author Danila Grobov
 */
import React from "react";
import "../scss/table/row.scss";
import checkbox from "../imgs/checkbox.svg";
import checkbox__checked from "../imgs/checkbox__checked.svg";
import checkbox__partial from "../imgs/checkbox_partial.svg";
import sort_up_active from "../imgs/sort_up_active.svg";
import sort_down_active from "../imgs/sort_down_active.svg";
import sort_up from "../imgs/sort_up.svg";
import sort_down from "../imgs/sort_down.svg";

/**
 * Component that's responsible for displaying a row in the table.
 */
export default props => {
    const {values, rowType, tickCheckbox, selected, sortState, setSortState} = props;
    // Generate an array of cells for the row.
    const cells = values.map(({value, type}, index) => {
            //Hide the cell separator for the last cell.
            const visibility = values.length - 1 === index || type === "title" ? "--hidden" : "";
            return [
                <span role={rowType === "header" ? "columnheader" : "cell"} key={"row_cell" + index}
                      className={`row__cell row__cell--${type}`}>
                    {value === null ? "--" : value}
                    {rowType === "header" ? //display sort buttons for each cell in the header.
                        <div key={"row_cellSort" + index} role={"checkbox"}
                             aria-checked={
                                 sortState.index === index ? (sortState.ascending ? "true" : "false") : "mixed"
                             }
                             aria-label={"changes sort state"}
                             className="row__sort" onClick={
                            () => setSortState({index, ascending: !sortState.ascending})
                        }>
                            {getSortIcons(sortState, index)}
                        </div>
                        : ""}
                </span>,
                <div key={"row__cellSeparator" + index} className={`row__cellSeparator${visibility}`}/>
            ];
        }
    );
    const visibility = rowType === "header" ? "--hidden" : ""; // Do not display a cell separator after master checkbox.
    let icon = checkbox;
    if (selected === "full")
        icon = checkbox__checked;
    else if (selected === "partial")
        icon = checkbox__partial;
    return (
        <div className={`row--${rowType}`} role={"row"} aria-label={rowType === "header" ? "header row" : "table row"}>
            <img onClick={tickCheckbox} src={icon} className="row__cell--checkbox" role={"checkbox"}
                 aria-checked={selected === "full" ? "true" : selected === "partial" ? "mixed" : "false"}
                 aria-label={"selects a row"}
            />
            <div className={`row__cellSeparator${visibility}`}/>
            {cells}
        </div>
    );
};

/**
 * Display correct sorting icons according to the sorting state.
 * @param sortState
 * @param index: header cell's index
 * @returns sorting icons
 */
function getSortIcons(sortState, index) {
    if (sortState.index !== index)
        return [
            <img key={"sort_up" + index} src={sort_up} alt="sort idle"
                 className="row__sortIcon"/>,
            <img key={"sort_down" + index} src={sort_down} alt="sort idle"
                 className="row__sortIcon"/>
        ];
    else if (sortState.index === index) {
        return sortState.ascending
            ? <img key={"sort_down" + index} src={sort_down_active} alt="sort asc" className="row__sortIcon"/>
            : <img key={"sort_up" + index} src={sort_up_active} alt="sort desc" className="row__sortIcon"/>;
    }
    return "";
}