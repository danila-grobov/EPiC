/**
 * @author Danila Grobov
 */
import {useState} from "react";

/**
 * Handles states needed to manage an input's helper.
 */
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

/**
 * Split the value into two halves, value's overlap with the helper and the remainder.
 * @param helper
 * @param value
 * @returns an array with overlap and the remainder
 */
function splitValue(helper, value) {
    const separator = helper[0];
    return value.split(
        new RegExp(`(?=${separator})`)
    );
}

/**
 * Checks if the overlap is consistent with the helper.
 * @param helper
 * @param overlap
 * @returns if value is valid
 */
function valueIsValid(helper, overlap) {
    return overlap.split("").reduce((valid, char, index) => valid && char === helper[index]);
}

