import React, {useRef} from "react"
import TableButton from "./TableButton";
import remove from "../imgs/delete.svg";
import add from "../imgs/add.svg";
import upload from "../imgs/upload.svg";
import "../scss/tableButtons.scss";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default props => {
    const {openPopup} = props;
    const fileInput = useRef(null);
    const importGrades = event => {
        const csvFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener('load', (event) => {
            try {
                fileInput.current.value = '';
                const fileContent = JSON.parse(event.target.result)["data"];
                toast.success("The grades were successfully added!");
            } catch (error) {
                toast.error("Please upload a json file.");
            }
            //TODO: send the data to backend
        });
        fileReader.readAsText(csvFile);
    }

    return (
        <div className="tableButtons">
            <input ref={fileInput} onChange={importGrades} type="file" style={{display: "none"}} accept={".json"}/>
            <TableButton icon={remove} title={"remove selected"}/>
            <TableButton onClick={openPopup} icon={add} title={"invite student"}/>
            <TableButton icon={upload} title={"import grades"} onClick={() => fileInput.current.click()}/>
            <ToastContainer />
        </div>
    )
}