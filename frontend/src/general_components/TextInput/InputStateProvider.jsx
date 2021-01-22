import React, {useState} from "react"
import useHelper from "../../hooks/useHelper";
import {inputTypes} from "./inputTypes";

export default props => {
    const {children, value, setValue, maxLength, type = "text", inputRef, ...otherProps} = props;
    const {helper = "", onChange, reset: emptyHelper} = useHelper(setValue, inputTypes[type].helpers, maxLength);
    const [focused, setFocused] = useState(false);
    const onFocus = () => setFocused(true);
    const autoComplete = () => {
        emptyHelper();
        setValue(value + helper);
    }
    const handleKeyDown = e => {
        if (helper !== "" && value !== "" && (e.code === "ArrowRight" || e.code === "Tab")
            && inputRef.current.selectionStart === value.length) {
            e.preventDefault();
            autoComplete();
        }
    }
    return children.map((child, index) =>
        React.cloneElement(child, {
                ...otherProps,
                key: `providerClone-${index}`,
                type,
                value,
                setValue,
                inputRef,
                helper,
                emptyHelper,
                focused,
                setFocused,
                onChange,
                onKeyDown: handleKeyDown,
                autoComplete,
                onFocus
            }
        ));
}