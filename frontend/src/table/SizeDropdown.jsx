import React from "react";
import useValue from "../hooks/useValue";
export default props => {
    const {rowCount,setRowCount,total} = props;
    const {bind,value:inputValue,setValue} = useValue(rowCount);
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
            <form onSubmit={e => {e.preventDefault(); handleChange(e)}} className="sizeDropdown__dropdown">
                <input {...bind} onBlur={handleChange} maxLength={2}
                       type={"text"} className="sizeDropdown__dropdown"/>
            </form>
        </div>
    )
}