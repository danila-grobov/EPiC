import React from "react";
import useInput from "../hooks/useInput";
export default props => {
    const {rowCount,setRowCount,total} = props;
    const {bind,value:inputValue,setValue} = useInput(rowCount,2);
    const handleChange = event => {
        let value = inputValue;
        if( isNaN(value)) value = 3
        if( value < 3) value = 3
        if( value > total) value = total
        setValue(value)
        setRowCount(value)
        //TODO: Reload the table with new values
    }
    return (
        <div className="sizeDropdown">
            <span className="sizeDropdown__label">
                {"Listings per page"}
            </span>
            <input {...bind} onBlur={handleChange} type={"text"} className="sizeDropdown__dropdown"/>
        </div>
    )
}