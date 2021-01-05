import {useState} from "react";
import {inputTypes} from "../general_components/FancyInput";

export default (type) => {
    const [errorMessage, setErrorMessage] = useState("");
    const checkValidity = (value) => {
        if (value.match(inputTypes[type].regEx)) {
            setErrorMessage("")
            return true;
        }
        setErrorMessage(inputTypes[type].errorMessage)
        return false;
    }
    return {errorMessage, checkValidity, setErrorMessage}
}