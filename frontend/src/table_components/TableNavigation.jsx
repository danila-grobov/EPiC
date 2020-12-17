import React from "react";
import "../scss/tableNavigation.scss";
import TablePagination from "./TablePagination";
import TableSizeSelector from "./TableSizeSelector";
export default () => {
    return (
        <div className="tableNavigation">
            <TablePagination />
            <TableSizeSelector />
        </div>
    );
}