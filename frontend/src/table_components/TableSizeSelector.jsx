import React from "react";
import SizeDropdown from "./SizeDropdown";
export default () => {
    return (
        <div className="tableSizeSelector">
            <span className="tableSizeSelector__info">
                {"Showing 1-5 of 100"}
            </span>
            <SizeDropdown />
        </div>
    )
}