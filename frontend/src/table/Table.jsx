import React, {useState, useEffect} from "react"
import "../scss/table/table.scss"
import SearchArea from "./SearchArea";
import TableContent from "./TableContent";
import TableButtons from "./TableButtons";
import TableNavigation from "./TableNavigation";
import InvitePopup from "./InvitePopup";
import axios from "axios";
import {stringify} from "qs";

export default ({course}) => {
    const [popupState, setPopupState] = useState(false);
    const [total, setTotal] = useState(0);
    const [rowCount, setRowCount] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const updateTable = () => {
        const offset = (currentPage - 1) * rowCount;
        return getStudentData({count: rowCount, offset, course, filters},
            res => {
                const {students, count} = res.data;
                setStudentData(students);
                setTotal(count[0]);
            });
    }
    useEffect(
        updateTable,
        [rowCount, currentPage, filters, popupState]
    );
    return (
        <div className="table">
            {popupState ? <InvitePopup course={course} closePopup={() => setPopupState(false)}/> : ""}
            <SearchArea filters={filters} setFilters={setFilters}/>
            <TableContent data={studentData} selectedCheckboxes={selectedCheckboxes}
                          setSelectedCheckboxes={setSelectedCheckboxes}/>
            <TableButtons openPopup={() => setPopupState(true)}
                          emails={getEmails(selectedCheckboxes, studentData)}
                          updateTable={updateTable}
                          course={course}
                          reset={() => setSelectedCheckboxes([])}
            />
            <TableNavigation total={total} rowCount={rowCount} setRowCount={setRowCount}
                             currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </div>
    )
}

function getStudentData(params, callback) {
    axios
        .get("/api/students", {
            params,
            // axios doesn't support arrays in params, that's a workaround
            paramsSerializer: params => stringify(params)
        })
        .then(callback);
}

function getEmails(selectedCheckboxes, data) {
    return selectedCheckboxes
        .filter(id => id !== 0)
        .map(id => {
            const dataRow = data[id];
            return dataRow ? dataRow[3].value : ""
        })
        .filter(email => email !== "")
}