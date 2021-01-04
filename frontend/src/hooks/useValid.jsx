import {useState} from "react";
export default (regEx, charLimit) => {
    const [valid, setValid] = useState(0); // -1 invlaid; 0 unchecked; 1 valid
    const updateValid = value => {
        if(value.match(regEx) && value.length <= charLimit) {
            setValid(1);
            return -1;
        }
        setValid(-1);
        if(value.length > charLimit)
            return 1;
        return 0;
    }
    return {valid, updateValid}
}