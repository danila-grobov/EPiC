import React from "react"
import {toast} from 'react-toastify';

export default props => {
    const {setFileData, inputRef: fileInput, successMessage, dataIsValid} = props;
    const importGrades = event => {
        const csvFile = event.target.files[0];
        const fileReader = new FileReader();
        fileReader.addEventListener('load', (event) => {
            try {
                fileInput.current.value = '';
                const fileContent = JSON.parse(event.target.result)["data"];
                if (!dataIsValid(fileContent)) {
                    toast.error("The file format is not valid.")
                } else {
                    setFileData(fileContent);
                    toast.success(successMessage);
                }
            } catch (error) {
                toast.error("Please upload a json file.");
            }
        });
        fileReader.readAsText(csvFile);
    }
    return (
        <input ref={fileInput} onChange={importGrades} type="file" style={{display: "none"}} accept={".json"}/>
    )
}