import React, {useRef, useState} from "react"
import TableButton from "./TableButton";
import remove from "../imgs/delete.svg";
import add from "../imgs/add.svg";
import upload from "../imgs/upload.svg";
import "../scss/tableButtons.scss";
import FileInput from "../general_components/FileInput";

export default props => {
    const {openPopup} = props;
    const [fileData, setFileData] = useState([]);
    return (
        <div className="tableButtons">
            <TableButton icon={remove} title={"remove selected"}/>
            <TableButton onClick={openPopup} icon={add} title={"invite student"}/>
            <FileInput setFileData={setFileData}
                       successMessage={"The grades were successfully uploaded!"}
                       button={<TableButton icon={upload} title={"import grades"}/>}
                       type={"grades"}
            />
        </div>
    )
}