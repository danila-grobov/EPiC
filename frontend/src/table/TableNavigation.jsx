/**
 * @author Danila Grobov
 */
import React from "react";
import "../scss/table/tableNavigation.scss";
import TablePagination from "./TablePagination";
import TableSizeSelector from "./TableSizeSelector";

/**
 * Displays the navigation components for the table.
 */
export default ({rowCount, currentPage, setCurrentPage, setRowCount, total}) => {
    return (
        <div className="tableNavigation">
            <TablePagination total={total} rowCount={rowCount}
                             currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <TableSizeSelector currentPage={currentPage} total={total} rowCount={rowCount} setRowCount={setRowCount}/>
        </div>
    );
}