import {useState} from "react";

export default (setValue, helpers) => {
    const [helper, setHelper] = useState(helpers[0]);
    const reset = () => {
        setHelper("");
    }
    const onChange = e => {
        const value = e.target.value ? e.target.value : e.target.innerText;
        let noOverlap = true;
        for (let fullHelper of helpers) {
            let [firstHalf, overlap] = splitValue(fullHelper,value);
            if (overlap !== undefined) {
                noOverlap = false;
                if (valueIsValid(fullHelper, overlap)) {
                    setValue(firstHalf + overlap);
                    setHelper(fullHelper.replace(overlap, ""));
                    break;
                }
            }
        }
        if (noOverlap) {
            setValue(value);
            setHelper(helpers[0])
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
    console.log(overlap);
    return overlap.split("").reduce((valid, char, index) => valid && char === helper[index]);
}

