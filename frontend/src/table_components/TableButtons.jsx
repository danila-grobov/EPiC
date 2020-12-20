import React from "react"
import TableButton from "./TableButton";
import remove from "../imgs/delete.svg";
import add from "../imgs/add.svg";
import upload from "../imgs/upload.svg";
import "../scss/tableButtons.scss";
export default props => {
    const {openPopup} = props;
    return (
        <div className="tableButtons">
            <TableButton icon={remove} title={"remove selected"}/>
            <TableButton onClick={openPopup} icon={add} title={"invite student"}/>
            <TableButton icon={upload} title={"import grades"}/>
        </div>
    )
}