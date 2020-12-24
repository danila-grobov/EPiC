import React, {useState, useRef, useEffect} from "react"
import useInput from "../hooks/useInput";

export default props => {
    const {label, className, type = "text", onSubmit, charLimit} = props;
    const [focused, setFocused] = useState(false);
    const [width, setWidth] = useState(1);
    const [cursorPos,setCursorPos] = useState(0);
    const textInput = useRef(null);
    const widthDonor = useRef(null);
    const {value, updateValid, valid, bind,helper, autoComplete,reset} = useInput("", charLimit, inputTypes[type].regEx);
    let labelStyle = (focused ? "textInput__label--focused" : "textInput__label") +
        (valid !== -1 ? "" : " textInput__label--error");
    useEffect(() => () => {
        setWidth(widthDonor.current.clientWidth)
    });
    const handleKeyDown = e => {
       if(e.code === "ArrowRight" && textInput.current.selectionStart === value.length) {
           autoComplete();
       }
    }
    return (
        <div className={"textInput__wrapper " + className} onClick={() => textInput.current.focus()}>
            <div className={`textInput${valid !== -1 ? "" : "--error"}`}>
                {label ? <span className={labelStyle}>{label}</span> : ""}
                <form onSubmit={e => {
                    e.preventDefault();
                    if(updateValid() === 1) {
                        onSubmit(value);
                        reset();
                    }
                }}>
                    <input type="text" className="textInput__input"
                           onFocus={() => setFocused(true)}
                           onBlur={() => setFocused(value !== "")}
                           ref={textInput}
                           style={{width}}
                           onKeyDown={handleKeyDown}
                           {...bind}/>
                    {value ? <span className="textInput__helper">{helper}</span> : null}
                </form>
            </div>
            {valid !== -1 ? "" :
                <span className="textInput__error">{inputTypes[type].error}</span>}
            <span className="textInput__widthDonor" ref={widthDonor}>{value}</span>
        </div>
    )
}
export const inputTypes = {
    email: {
        regEx: /^([a-zA-Z0-9_\-\.]+)@(ncl|newcastle).ac.uk$/,
        error: "Please enter a valid newcastle university email address."
    },
    text: {
        regEx: /.*/,
        error: ""
    }
}