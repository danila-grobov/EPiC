import {useState} from "react"

export default (initialValue, charLimit, regEx=/.*/) => {
    const [value, setValue] = useState(initialValue);
    const [valid, setValid] = useState(0);
    const updateValid = () => {
        if (value.match(regEx) !==null) {
            setValid(1);
            return 1;
        }
        setValid(-1);
        return -1;
    };
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