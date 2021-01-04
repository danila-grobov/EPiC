import {useState} from "react"
// This hooks main purpose is to simplify the setup of inputs
// Typical use case: <input {...bind} type="text"/>
// bind object contains all of the props needed to track the state of an input.
export default initialValue => {
    const [value, setValue] = useState(initialValue);
    const onChange = e => {
        const newValue = e.target.value ? e.target.value : e.target.innerText;
        setValue(newValue);
    }
    return {
        value,
        setValue,
        reset: () => setValue(""),
        onChange,
        bind: {
            value,
            onChange
        }
    };
}