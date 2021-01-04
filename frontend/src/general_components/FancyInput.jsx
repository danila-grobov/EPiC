import React, {useState, useRef, useEffect} from "react"
import useValue from "../hooks/useValue";
import useHelper from "../hooks/useHelper";

export default props => {
    const {
        label, className = "", type = "text", onSubmit, valid, charLimit = 30
    } = props;
    const [focused, setFocused] = useState(false);
    const [width, setWidth] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const textInput = useRef(null);
    const widthDonor = useRef(null);

    const {setValue, value, reset} = useValue("");
    const {helper = "", onChange, reset: emptyHelper} = useHelper(setValue, inputTypes[type].helpers, charLimit);

    const labelStyle = (focused || value !== "" ? "textInput__label--focused" : "textInput__label") +
        (valid !== -1 ? "" : " textInput__label--error");
    useEffect(() => {
        setWidth(widthDonor.current.clientWidth + 2)
    });
    const handleKeyDown = e => {
        if (value !== "" && e.code === "ArrowRight" &&
            textInput.current.selectionStart === value.length) {
            emptyHelper();
            setValue(value + helper);
        }
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (onSubmit) {
            const errorIndex = onSubmit(value);
            if (errorIndex === -1) {
                reset();
                setErrorMessage("")
            } else setErrorMessage(inputTypes[type].errorMessages[errorIndex])
        }
    }
    return (
        <div className={"textInput__wrapper " + className} onClick={() => textInput.current.focus()}>
            <div className={`textInput ${valid !== -1 ? "" : "textInput--error"}`}>
                {label ? <span className={labelStyle}>{label}</span> : ""}
                <form onSubmit={handleSubmit}>
                    <input type={type === "password" ? "password" : "text"} className="textInput__input"
                           onFocus={() => setFocused(true)}
                           onBlur={() => setFocused(false)}
                           ref={textInput}
                           style={type === "email" ? {width} : {}}
                           onKeyDown={handleKeyDown}
                           value={value}
                           onChange={onChange}
                           maxLength={type === "email" ? "" : charLimit}
                    />
                    {focused && value && type === "email" ? <span className="textInput__helper">{helper}</span> : null}
                </form>
            </div>
            {errorMessage.length === 0 ? "" :
                <span className="textInput__error">{errorMessage}</span>}
            <span className="textInput__widthDonor" ref={widthDonor}>{value}</span>
        </div>
    )
}
export const inputTypes = {
    email: {
        regEx: /^([a-zA-Z0-9_\-\.]+)@(ncl|newcastle).ac.uk$/,
        errorMessages: [
            "Please enter a valid newcastle university email address.",
            "The email is too long."
        ],
        helpers: ["@ncl.ac.uk", "@newcastle.ac.uk"]
    },
    text: {
        regEx: /.*/,
        errorMessages: [
            "",
            "The value is too long."
        ],
        helpers: []
    },
    password: {
        regEx: /.*/,
        errorMessages: [
            "",
            "The value is too long."
        ],
        helpers: []
    }
}