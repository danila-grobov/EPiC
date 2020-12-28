import React, {useState, useEffect} from "react"
import TableButton from "./TableButton";
import remove from "../imgs/delete.svg";
import add from "../imgs/add.svg";
import upload from "../imgs/upload.svg";
import "../scss/table/tableButtons.scss";
import FileInput from "../general_components/FileInput";
import axios from "axios";
import {stringify} from "qs";
import {toast} from "react-toastify";

export default props => {
    const {openPopup, usernames, updateTable, reset, course} = props;
    const [fileData, setFileData] = useState([]);
    useEffect(() => setGrades(fileData, course), [fileData])
    return (
        <div className="tableButtons">
            <TableButton icon={remove} title={"remove selected"}
                         onClick={() => removeFromCourse(usernames, updateTable, reset)}/>
            <TableButton onClick={openPopup} icon={add} title={"invite student"}/>
            <FileInput setFileData={setFileData}
                       button={<TableButton icon={upload} title={"import grades"}/>}
                       type={"grades"}
            />
        </div>
    )
}

function removeFromCourse(usernames, updateTable, reset) {
    if (usernames.length !== 0)
        axios
            .delete('api/students', {
                params: {usernames},
                paramsSerializer: params => stringify(params)
            })
            .then(() => {
                reset();
                updateTable();
            })
}

function setGrades(data, course) {
    if (data.length !== 0)
        axios.put("/api/students/grade", {data,course}).then(
            () => toast.success("The grades were successfully updated!")
        )
}
