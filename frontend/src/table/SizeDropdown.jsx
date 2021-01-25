/**
 * @author Danila Grobov
 */
import React, {useEffect} from "react";
import useValue from "../hooks/useValue";

/**
 * Component for selecting the amount of rows displayed in the table.
 */
export default props => {
    const {rowCount,setRowCount,total} = props;
    const {bind,value:inputValue,setValue} = useValue(rowCount);
    useEffect(() => {
        setValue(rowCount);
    },[rowCount])
    const handleChange = () => {
        // Keep the value in the appropriate range of values.
        let value = inputValue;
        if(isNaN(value)) value = 3;
        if(value < 3) value = 3;
        if(value > total) value = total;
        setValue(value);
        setRowCount(value);
    }
    return (
        <div className="sizeDropdown">
            <span className="sizeDropdown__label">
                {"Listings per page"}
            </span>
            <form onSubmit={e => {e.preventDefault(); handleChange(e)}} className="sizeDropdown__dropdown">
                <input {...bind} onBlur={handleChange} maxLength={2} width={"auto"}
                       type={"text"} className="sizeDropdown__dropdown"/>
            </form>
        </div>
    )
}