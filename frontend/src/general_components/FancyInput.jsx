import React, {useState, useRef, useEffect} from "react";
import useHelper from "../hooks/useHelper";
import "../scss/textInput.scss";
import right_button from "../imgs/right_button.svg";

export default props => {
    const {
        label, className = "", type = "text", onSubmit, charLimit,
        value, setValue, errorMessage = "", disabled = false, inputRef = useRef(null)
    } = props;
    const [focused, setFocused] = useState(false);
    const [width, setWidth] = useState(1);
    const widthDonor = useRef(null);
    const {helper = "", onChange, reset: emptyHelper} = useHelper(setValue, inputTypes[type].helpers, charLimit);
    const labelStyle = (focused || value !== "" ? "textInput__label--focused" : "textInput__label") +
        (errorMessage.length === 0 ? "" : " textInput__label--error");
    useEffect(() => {
        setWidth(widthDonor.current.clientWidth + 2);
        const onMouseDown = e => {
            const inputWrapper = inputRef.current.parentElement.parentElement.parentElement;
            if(inputWrapper.contains(e.target))
                setFocused(true);
            else setFocused(false);
        };
        document.addEventListener("mousedown", onMouseDown);
        return () => document.removeEventListener("mousedown", onMouseDown);
    });
    const autoComplete = () => {
        emptyHelper();
        setValue(value + helper);
    }
    const handleKeyDown = e => {
        if (value !== "" && e.code === "ArrowRight" && inputRef.current.selectionStart === value.length)
            autoComplete()
    }
    return (
        <div className={"textInput__wrapper " + className + (disabled ? " textInput__wrapper--disabled" : "")}
             onClick={() => !disabled ? inputRef.current.focus() : null}>
            <div className={`textInput ${errorMessage.length === 0 ? "" : "textInput--error"}`}>
                {label ? <span className={labelStyle}>{label}</span> : ""}
                <form onSubmit={e => {
                    e.preventDefault();
                    onSubmit ? onSubmit(value) : null
                }}>
                    <input type={type === "password" ? "password" : "text"} className="textInput__input"
                           ref={inputRef}
                           style={type === "email" ? {width} : {}}
                           onKeyDown={handleKeyDown}
                           onFocus={() => setFocused(true)}
                           value={value}
                           onChange={onChange}
                           maxLength={type === "email" || !charLimit ? "" : charLimit}
                    />
                    {focused && value && type === "email" && helper
                        ? <span className="textInput__helper">
                            {helper}
                            <img src={right_button} alt="right key" onClick={autoComplete}
                                 className="textInput__helperImg"/>
                        </span>
                        : null}
                </form>
            </div>
            {charLimit ?
                <span className="textInput__charCounter">{`${value.length}/${charLimit}`}</span> :
                ""
            }
            <span className="textInput__error">{errorMessage.length === 0 ? "" : errorMessage}</span>
            <span className="textInput__widthDonor" ref={widthDonor}>{value}</span>
        </div>
    )
}

export const inputTypes = {
    email: {
        regEx: /^([a-zA-Z0-9_\-\.]+)@(ncl|newcastle).ac.uk$/,
        errorMessage: "Please enter a valid newcastle university email address.",
        helpers: ["@ncl.ac.uk", "@newcastle.ac.uk"]
    },
    text: {
        regEx: /.+/,
        errorMessage: "The field cannot be empty",
        helpers: []
    },
    password: {
        regEx: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,30})/,
        errorMessage:
            "The password must be between 8 and 30 characters long and must contain at least one lower case letter, " +
            "one upper case letter and a number",
        helpers: []
    }
}