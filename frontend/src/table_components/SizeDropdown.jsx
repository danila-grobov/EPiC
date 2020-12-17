import React from "react";
import arrow_down from "../imgs/arrow_down.svg";
export default () => {
    return (
        <div className="sizeDropdown">
            <span className="sizeDropdown__label">
                {"Listings per page"}
            </span>
            <input type={"text"} className="sizeDropdown__dropdown"/>
        </div>
    )
}