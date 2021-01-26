/**
 * @author Danila Grobov
 */
import React, {useState, useEffect} from "react";
import TableButton from "./TableButton";
import remove from "../imgs/delete.svg";
import add from "../imgs/add.svg";
import upload from "../imgs/upload.svg";
import "../scss/table/tableButtons.scss";
import FileInput from "../general_components/FileInput";
import axios from "axios_redirect";
import {stringify} from "qs";
import {toast} from "react-toastify";

/**
 * Displays the buttons for interactions with students in a table.
 */
export default props => {
    const {openPopup, emails, updateTable, reset, course} = props;
    const [fileData, setFileData] = useState([]);
    useEffect(() => setGrades(fileData, course), [fileData]);
    return (
        <div className="tableButtons">
            <TableButton icon={remove} title={"remove selected"}
                         onClick={() => removeFromCourse(course,emails, updateTable, reset)}/>
            <TableButton onClick={openPopup} icon={add} title={"invite student"}/>
            <FileInput setFileData={setFileData}
                       button={<TableButton icon={upload} title={"import grades"}/>}
                       type={"grades"}
            />
        </div>
    );
};

/**
 * Remove selected students from the course.
 * @param course
 * @param emails: emails of the selected student rows.
 * @param updateTable: function to update table from a database.
 * @param reset: unselect all rows.
 */
function removeFromCourse(course, emails, updateTable, reset) {
    if (emails.length !== 0)
        axios
            .delete('/api/t/students', {
                params: {emails,course},
                paramsSerializer: params => stringify(params)
            })
            .then(() => {
                reset();
                updateTable();
            });
}

/**
 * Set the grade for the students in the db.
 * @param data: student's data with grades.
 * @param course
 */
function setGrades(data, course) {
    if (data.length !== 0)
        axios.put("/api/t/students/grade", {data,course}).then(
            () => toast.success("The grades were successfully updated!")
        );
}
