import React from "react";
import SizeDropdown from "./SizeDropdown";

export default props => {
    const {total, rowCount, setRowCount, currentPage} = props;
    return (
        <div className="tableSizeSelector">
            <span className="tableSizeSelector__info">
                {total > 0 ? `Showing 
                ${((currentPage - 1) * rowCount) + 1}-${Math.min((currentPage - 1) * rowCount + rowCount, total)
                } of ${total}` : "Showing 0 of 0"}
            </span>
            <SizeDropdown total={total} rowCount={rowCount} setRowCount={setRowCount}/>
        </div>
    )
}