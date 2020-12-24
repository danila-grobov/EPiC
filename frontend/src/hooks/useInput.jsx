import {useState} from "react"
// This hooks main purpose is to simplify the setup of inputs
// Typical use case: <input {...bind} type="text"/>
// bind object contains all of the props needed to track the state of an input.
export default (initialValue, charLimit, regEx=/.*/) => {
    const [value, setValue] = useState(initialValue);
    const [helper, setHelper] = useState("@newcastle.ac.uk")
    const [valid, setValid] = useState(0); // Input validity states: -1(invalid), 0(unchecked), 1(valid)
    const updateValid = () => {
        if (value.match(regEx) !==null) {
            setValid(1);
            return 1;
        }
        setValid(-1);
        return -1;
    }; // update input validity state
    const autoComplete = () => {
        setValue(value + helper);
        setHelper("");
    }
    const onChange = e => {
        const newValue = e.target.value ? e.target.value : e.target.innerText;
        const splittedValue = newValue.split("@");
        const validEmail = "@newcastle.ac.uk";
        const validShortenedEmail = "@ncl.ac.uk";
        if(splittedValue[1] !== undefined) {
            const valueWithAt = "@"+splittedValue[1];
            let valid = true;
            let validIndex = 0;
            valueWithAt.split("").map((char,index) => {
                if(char !== validEmail[index]) valid = false;
                validIndex = index;
            })
            if(!valid) {
                valid = true;
                valueWithAt.split("").map((char,index) => {
                    if(char !== validShortenedEmail[index]) valid = false;
                    validIndex = index;
                })
                if(valid) {
                    setHelper(validShortenedEmail.slice(validIndex+1));
                    setValue(splittedValue[0]+valueWithAt);
                }
            } else {
                setHelper(validEmail.slice(validIndex+1));
                setValue(splittedValue[0]+valueWithAt);
            }
        } else {
            if (newValue.length <= charLimit && newValue.match(/^[a-zA-Z0-9_\-.]*$/)) {
                setHelper(validEmail);
                setValue(newValue);
            }
        }
    }
    return {
        updateValid,
        value,
        setValue,
        setHelper,
        autoComplete,
        helper,
        reset: () => setValue(""),
        valid,
        onChange,
        bind: {
            valid,
            value,
            onChange
        }
    };
}