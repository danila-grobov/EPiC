import {useState} from "react"
// This hooks main purpose is to simplify the setup of inputs
// Typical use case: <input {...bind} type="text"/>
// bind object contains all of the props needed to track the state of an input.
export default (initialValue, charLimit, regEx=/.*/) => {
    const [value, setValue] = useState(initialValue);
    const [valid, setValid] = useState(0); // Input validity states: -1(invalid), 0(unchecked), 1(valid)
    const updateValid = () => {
        if (value.match(regEx) !==null) {
            setValid(1);
            return 1;
        }
        setValid(-1);
        return -1;
    }; // update input validity state
    return {
        updateValid,
        value,
        setValue,
        reset: () => setValue(""),
        valid,
        bind: {
            valid,
            value,
            onChange: e => {
                const newValue = e.target.value;
                if (newValue.length <= charLimit)
                    setValue(newValue);
            }
        }
    };
}