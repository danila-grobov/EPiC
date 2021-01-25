/**
 * @author Danila Grobov
 */
import React from "react"
import Row from "./Row";

/**
 * Component that's responsible for displaying students' data.
 */
export default ({data, selectedCheckboxes, setSelectedCheckboxes, sortState, setSortState}) => {
    //Add supplied checkboxes' index to selectedCheckboxes array.
    const tickCheckbox = index => {
        if (selectedCheckboxes.includes(index)) {
            setSelectedCheckboxes(
                selectedCheckboxes.filter(checkbox_index => checkbox_index !== index)
            );
        } else {
            setSelectedCheckboxes([...selectedCheckboxes, index]);
        }
    };
    //Add all checkboxes to selectedCheckboxes array.
    const tickAll = () => {
        if (selectedCheckboxes.length !== data.length) {
            setSelectedCheckboxes([...data.keys()]);
        } else {
            setSelectedCheckboxes([]);
        }
    }
    //Determine the status of the master checkbox
    const getCheckboxStatus = () => {
        const withoutHeaderCheckbox = selectedCheckboxes.filter(checkboxId => checkboxId !== 0);
        if (withoutHeaderCheckbox.length >= data.length - 1)
            return "full"
        else if (withoutHeaderCheckbox.length === 0)
            return "none"
        return "partial"
    }
    const dataRows = data.map((rowData, index) => {
        if (index === 0) // the header row
            return (<Row sortState={sortState} setSortState={setSortState} key={index} rowType={"header"}
                         values={rowData} tickCheckbox={tickAll} selected={getCheckboxStatus()}/>)
        else
            return (<Row key={index} id={index} rowType={index % 2 === 0 ? "even" : "odd"} values={rowData}
                         tickCheckbox={() => tickCheckbox(index)}
                         selected={selectedCheckboxes.includes(index) ? "full" : "none"}/>)
    });
    return (
        <div className="tableContent" role={"table"}>
            {
                dataRows.length > 1 ? dataRows :
                    <span className="tableContent__empty">
                        {"No students in the system"}
                    </span>
            }
        </div>
    )
}
