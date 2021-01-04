import {useState} from "react";

export default (setValue, helpers, charLimit) => {
    const defaultHelper = helpers.length > 0 ? helpers[0] : "";
    const [helper, setHelper] = useState(defaultHelper);
    const reset = () => {
        setHelper("");
    }
    const onChange = e => {
        const value = e.target.value ? e.target.value : e.target.innerText;
        let noOverlap = true;
        for (let fullHelper of helpers) {
            let [firstHalf, overlap] = splitValue(fullHelper,value);
            if (overlap !== undefined && (firstHalf + fullHelper).length <= charLimit) {
                noOverlap = false;
                if (valueIsValid(fullHelper, overlap)) {
                    setValue(firstHalf + overlap);
                    setHelper(fullHelper.replace(overlap, ""));
                    break;
                }
            }
        }
        if (noOverlap) {
            if(value.length + defaultHelper.length <= charLimit)
                setValue(value);
            setHelper(defaultHelper)
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

