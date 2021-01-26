/**
 * @author Danila Grobov
 */
import React from "react";
import SizeDropdown from "./SizeDropdown";

/**
 * Displays the information and a selector for the amount of rows being displayed in the table.
 */
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
    );
};