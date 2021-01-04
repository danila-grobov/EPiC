import React, {useState, useEffect} from "react"
import Row from "./Row";
import axios from "axios";

export default ({data, selectedCheckboxes, setSelectedCheckboxes}) => {
    const tickCheckbox = index => {
        if (selectedCheckboxes.includes(index)) {
            setSelectedCheckboxes(
                selectedCheckboxes.filter(checkbox_index => checkbox_index !== index)
            );
        } else {
            setSelectedCheckboxes([...selectedCheckboxes, index]);
        }
    }
    const tickAll = () => {
        if (selectedCheckboxes.length !== data.length) {
            setSelectedCheckboxes([...data.keys()]);
        } else {
            setSelectedCheckboxes([]);
        }
    }
    const getCheckboxStatus = () => {
        const withoutHeaderCheckbox = selectedCheckboxes.filter(checkboxId => checkboxId !== 0);
        if (withoutHeaderCheckbox.length >= data.length - 1)
            return "full"
        else if (withoutHeaderCheckbox.length === 0)
            return "none"
        return "partial"
    }
    const dataRows = data.map((rowData, index) => {
        if (index === 0)
            return (<Row key={index} rowType={"header"} values={rowData}
                         tickCheckbox={tickAll}
                         selected={getCheckboxStatus()}/>)
        else
            return (<Row key={index} id={index} rowType={index % 2 === 0 ? "even" : "odd"} values={rowData}
                         tickCheckbox={() => tickCheckbox(index)}
                         selected={selectedCheckboxes.includes(index) ? "full" : "none"}/>)
    });
    return (
        <div className="tableContent">
            {
                dataRows.length > 1 ? dataRows :
                    <span className="tableContent__empty">
                        {"No students in the system"}
                    </span>
            }
        </div>
    )
}
