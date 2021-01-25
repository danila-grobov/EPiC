/**
 * @author Danila Grobov
 */
import {useState} from "react";
import {inputTypes} from "../general_components/TextInput/inputTypes";

/**
 * Handles input's data validation
 */
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