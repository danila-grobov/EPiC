import {useState} from "react";

export default (setValue, helpers, charLimit) => {
    const defaultHelper = helpers.length > 0 ? helpers[0] : "";
    const [helper, setHelper] = useState("");
    const reset = () => {
        setHelper("");
    }
    const onChange = e => {
        const value = e.target.value ? e.target.value : e.target.innerText;
        let noOverlap = true;
        for (let fullHelper of helpers) {
            let [firstHalf, overlap] = splitValue(fullHelper,value);
            if (overlap !== undefined && (!charLimit || (firstHalf + fullHelper).length <= charLimit)) {
                noOverlap = false;
                if (valueIsValid(fullHelper, overlap)) {
                    setValue(firstHalf + overlap);
                    setHelper(fullHelper.replace(overlap, ""));
                    break;
                }
            }
        }
        if (noOverlap) {
            if(!charLimit || value.length <= charLimit)
                setValue(value);
            if(!charLimit || (value !== "" && value.length + defaultHelper.length <= charLimit) )
                setHelper(defaultHelper)
            else setHelper("")
        }
    }
    return {
        helper,
        onChange,
        reset
    }
}

function splitValue(helper, value) {
    const separator = helper[0];
    return value.split(
        new RegExp(`(?=${separator})`)
    );
}

function valueIsValid(helper, overlap) {
    return overlap.split("").reduce((valid, char, index) => valid && char === helper[index]);
}

