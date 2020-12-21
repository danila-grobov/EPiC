import React, {useRef,useState} from "react"
import TableButton from "./TableButton";
import remove from "../imgs/delete.svg";
import add from "../imgs/add.svg";
import upload from "../imgs/upload.svg";
import "../scss/tableButtons.scss";
import 'react-toastify/dist/ReactToastify.css';
import FileInput from "./FileInput";

export default props => {
    const {openPopup} = props;
    const [fileData,setFileData] = useState([]);
    const fileInput = useRef(null);
    return (
        <div className="tableButtons">
            <FileInput inputRef={fileInput} setFileData={setFileData}
                       successMessage={"The grades were successfully uploaded!"}
                       dataIsValid={data =>
                           data.reduce((valid, element) => {
                               return typeof element === "object" && element.hasOwnProperty("username") &&
                                   element.hasOwnProperty("grade") && valid
                           }, true)
                       }
            />
            <TableButton icon={remove} title={"remove selected"}/>
            <TableButton onClick={openPopup} icon={add} title={"invite student"}/>
            <TableButton icon={upload} title={"import grades"} onClick={() => fileInput.current.click()}/>
        </div>
    )
}