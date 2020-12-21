import React from "react";
import SizeDropdown from "./SizeDropdown";

export default props => {
    const {total,rowCount,setRowCount} = props;
    return (
        <div className="tableSizeSelector">
            <span className="tableSizeSelector__info">
                {`Showing 1-${rowCount} of ${total}`}
            </span>
            <SizeDropdown total={total} rowCount={rowCount} setRowCount={setRowCount}/>
        </div>
    )
}