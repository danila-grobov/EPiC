import React, {useState, useEffect} from "react"
import "../scss/table/table.scss"
import SearchArea from "./SearchArea";
import TableContent from "./TableContent";
import TableButtons from "./TableButtons";
import TableNavigation from "./TableNavigation";
import InvitePopup from "./InvitePopup";
import useTable from "../hooks/useTable";

export default ({course}) => {
    const tableState = useTable(course);
    return (
        <div className="table">
            {tableState.popupIsOpen ? <InvitePopup course={course} closePopup={tableState.closePopup}/> : ""}
            <SearchArea filters={tableState.filters} setFilters={tableState.setFilters}/>
            <TableContent sortState={tableState.sortState} setSortState={tableState.setSortState}
                          data={tableState.studentData} selectedCheckboxes={tableState.selectedCheckboxes}
                          setSelectedCheckboxes={tableState.setSelectedCheckboxes}/>
            <TableButtons openPopup={tableState.openPopup} emails={tableState.getSelectedEmails()}
                          updateTable={tableState.updateTable} course={course}
                          reset={tableState.resetCheckboxes}
            />
            <TableNavigation total={tableState.total} rowCount={tableState.rowCount}
                             setRowCount={tableState.setRowCount} currentPage={tableState.currentPage}
                             setCurrentPage={tableState.setCurrentPage}/>
        </div>
    )
}
