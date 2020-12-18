import {useState} from "react"

export default (initialValue, charLimit) => {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        setValue,
        reset: () => setValue(""),
        bind: {
            value,
            onChange: e => {
                const newValue = e.target.value;
                if(newValue.length <= charLimit)
                    setValue(newValue);
            }
        }
    };
}