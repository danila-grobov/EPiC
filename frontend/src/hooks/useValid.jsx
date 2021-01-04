import {useState} from "react";
export default (value,regEx) => {
    const [valid, setValid] = useState(0); // -1 invlaid; 0 unchecked; 1 valid
    const updateValid = () => {
        if(value.match(regEx)) {
            setValid(1);
            return 1;
        }
        setValid(-1);
        return -1;
    }
    return {valid, updateValid}
}