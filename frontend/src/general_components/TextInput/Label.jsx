/**
 * @author Danila Grobov
 */
import React, {useEffect} from "react";

/**
 * Displays a label for an input.
 */
export default ({label, setFocused, inputRef, focused, value, errorMessage}) => {
    useEffect(() => setupListeners(setFocused, inputRef), []);
    const className = (focused || value !== "" ? "textInput__label--focused" : "textInput__label") +
        (errorMessage.length === 0 ? "" : " textInput__label--error");
    if(label)
        return (
            <span className={className}>{label}</span>
        );
    return null;
};

/**
 * Sets up mousedown listener to determine when the input was in-focus.
 * @param setFocused
 * @param inputRef
 * @returns {function(): void}
 */
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