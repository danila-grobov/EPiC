import React, {useState, useRef, useEffect} from "react"
import useValue from "../hooks/useValue";
import useHelper from "../hooks/useHelper";
import useValid from "../hooks/useValid";

export default props => {
    const {label, className, type = "text", onSubmit, charLimit} = props;
    const [focused, setFocused] = useState(false);
    const [width, setWidth] = useState(1);
    const textInput = useRef(null);
    const widthDonor = useRef(null);

    const {setValue, value, reset} = useValue("");
    const {helper, onChange, reset: emptyHelper} = useHelper(setValue, inputTypes[type].helpers);
    const {valid, updateValid} = useValid(value, inputTypes[type].regEx);

    const labelStyle = (focused ? "textInput__label--focused" : "textInput__label") +
        (valid !== -1 ? "" : " textInput__label--error");
    useEffect(() => () => {
        setWidth(widthDonor.current.clientWidth)
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
        if (updateValid() === 1) {
            onSubmit(value);
            reset();
        }
    }
    return (
        <div className={"textInput__wrapper " + className} onClick={() => textInput.current.focus()}>
            <div className={`textInput${valid !== -1 ? "" : "--error"}`}>
                {label ? <span className={labelStyle}>{label}</span> : ""}
                <form onSubmit={handleSubmit}>
                    <input type="text" className="textInput__input"
                           onFocus={() => setFocused(true)}
                           onBlur={() => setFocused(value !== "")}
                           ref={textInput}
                           style={{width}}
                           onKeyDown={handleKeyDown}
                           maxLength={charLimit}
                           value={value}
                           onChange={onChange}
                    />
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
        error: "Please enter a valid newcastle university email address.",
        helpers: ["@ncl.ac.uk", "@newcastle.ac.uk"]
    },
    text: {
        regEx: /.*/,
        error: "",
        helpers: []
    }
}