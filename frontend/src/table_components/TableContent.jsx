import React from "react"
import "../scss/tableContent.scss"
import Row from "./Row";
import data from "./testData_table";
export default () => {
    const dataRows = data.map((rowData,index) => {
        if(index === 0)
            return (<Row key={index} rowType={"header"} values={rowData}/>)
        if(index % 2 === 0)
            return (<Row key={index} rowType={"even"} values={rowData}/>)
        else
            return (<Row key={index} rowType={"odd"} values={rowData}/>)
    });
    return (
        <div className="tableContent">
            {dataRows}
        </div>
    )
}