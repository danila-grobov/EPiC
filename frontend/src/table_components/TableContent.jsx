import React, {useState} from "react"
import "../scss/tableContent.scss"
import Row from "./Row";
import data from "./testData_table";
export default () => {
    const [selectedCheckboxes,setSelectedCheckboxes] = useState([]);
    const dataRows = data.map((rowData,index) => {
        if(index === 0)
            return (<Row key={index} rowType={"header"} values={rowData}
                         tickCheckbox={() => setSelectedCheckboxes([...data.keys()])}
                         selected={selectedCheckboxes.length === data.length}/>)
        if(index % 2 === 0)
            return (<Row key={index} id={index} rowType={"even"} values={rowData}
                         tickCheckbox={() => setSelectedCheckboxes([...selectedCheckboxes,index])}
                         selected={selectedCheckboxes.includes(index)}/>)
        else
            return (<Row key={index} id={index} rowType={"odd"} values={rowData}
                         tickCheckbox={() => setSelectedCheckboxes([...selectedCheckboxes,index])}
                         selected={selectedCheckboxes.includes(index)}/>)
    });
    return (
        <div className="tableContent">
            {dataRows}
        </div>
    )
}