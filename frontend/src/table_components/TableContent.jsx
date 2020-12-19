import React, {useState} from "react"
import Row from "./Row";
import data from "./testData_table";

export default () => {
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const tickCheckbox = index => {
        if (selectedCheckboxes.includes(index)) {
            setSelectedCheckboxes(
                selectedCheckboxes.filter(checkbox_index => checkbox_index!==index)
            );
        } else {
            setSelectedCheckboxes([...selectedCheckboxes, index]);
        }
    }
    const tickAll = () => {
        if(selectedCheckboxes.length !== data.length) {
            setSelectedCheckboxes([...data.keys()]);
        } else {
            setSelectedCheckboxes([]);
        }
    }
    const getCheckboxStatus = () => {
        console.log(selectedCheckboxes);
        if(selectedCheckboxes.length >= data.length - 1)
            return "full"
        else if(selectedCheckboxes.length === 0)
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
            {dataRows}
        </div>
    )
}