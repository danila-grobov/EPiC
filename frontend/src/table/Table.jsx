import React, {useState, useEffect} from "react"
import "../scss/table/table.scss"
import SearchArea from "./SearchArea";
import TableContent from "./TableContent";
import TableButtons from "./TableButtons";
import TableNavigation from "./TableNavigation";
import InvitePopup from "./InvitePopup";
import axios from "axios";

export default () => {
    const [popupState, setPopupState] = useState(false);
    const [total, setTotal] = useState(0);
    const [rowCount, setRowCount] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        return getNumberOfStudents((res) => {
            setTotal(res.data.count);
        });
    }, [rowCount, currentPage]);
    return (
        <div className="table">
            {popupState ? <InvitePopup closePopup={() => setPopupState(false)}/> : ""}
            <SearchArea/>
            <TableContent rowCount={rowCount} currentPage={currentPage}/>
            <TableButtons openPopup={() => setPopupState(true)}/>
            <TableNavigation total={total} rowCount={rowCount} setRowCount={setRowCount}
                             currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}
function getNumberOfStudents(callback) {
    axios
        .get("/api/students/count")
        .then(callback);
}