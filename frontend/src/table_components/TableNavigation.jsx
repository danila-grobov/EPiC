import React, {useState} from "react";
import "../scss/tableNavigation.scss";
import TablePagination from "./TablePagination";
import TableSizeSelector from "./TableSizeSelector";
export default () => {
    const total = 25;
    const [rowCount, setRowCount] = useState(total < 3 ? total : 3);
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div className="tableNavigation">
            <TablePagination total={total} rowCount={rowCount}
                             currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <TableSizeSelector total={total} rowCount={rowCount} setRowCount={setRowCount}/>
        </div>
    );
}