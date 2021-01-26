import React, {useEffect} from "react"

export default ({label, setFocused, inputRef, focused, value, errorMessage}) => {
    useEffect(() => setupListeners(setFocused, inputRef), []);
    const className = (focused || value !== "" ? "textInput__label--focused" : "textInput__label") +
        (errorMessage.length === 0 ? "" : " textInput__label--error");
    if(label)
        return (
            <span className={className}>{label}</span>
        );
    return null;
}
function setupListeners(setFocused, inputRef) {
    const onMouseDown = e => {
        const inputWrapper = inputRef.current.parentElement.parentElement.parentElement;
        if (inputWrapper.contains(e.target))
            setFocused(true);
        else setFocused(false);
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
}