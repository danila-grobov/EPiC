import React, {useRef, cloneElement} from "react"
import {toast} from 'react-toastify';
import {inputTypes} from "./FancyInput";

export default props => {
    const fileInput = useRef(null);
    const button = cloneElement(props.button, {
        onClick: () => fileInput.current.click()
    });
    return (
        <>
            {button}
            <input aria-label={"file input"} ref={fileInput} type="file" style={{display: "none"}} accept={".json"}
                   onChange={event => processFile(event, {...props, fileInput})}/>
        </>
    )
}
const processFile = (event, {type, fileInput, successMessage, setFileData}) => {
    const jsonFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener('load', (event) => {
        try {
            fileInput.current.value = '';
            const fileContent = JSON.parse(event.target.result)["data"];
            if (!dataIsValid(fileContent, type)) {
                toast.error("The file format is not valid.")
            } else {
                setFileData(fileContent);
                if(successMessage)
                    toast.success(successMessage);
            }
        } catch (error) {
            toast.error("Please upload a json file.");
        }
    });
    fileReader.readAsText(jsonFile);
}
const dataIsValid = (fileContent, type) => fileContent.reduce((valid, element) => {
    switch (type){
        case "emails":
            return typeof element === "string" && element.match(inputTypes["email"].regEx) && valid
        case "grades":
            return typeof element === "object" && element.hasOwnProperty("email") &&
                element.hasOwnProperty("grade") && valid
    }

}, true)