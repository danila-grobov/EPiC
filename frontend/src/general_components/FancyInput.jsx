import React,{useState} from "react"
import useInput from "../hooks/useInput";
export default props => {
    const {label, className, type = "text", onSubmit, charLimit} = props;
    const [focused, setFocused] = useState(false);
    const {bind, value, updateValid, valid} = useInput("", charLimit, inputTypes[type].regEx);
    let labelStyle = (focused ? "textInput__label--focused" : "textInput__label") +
        (valid !== -1 ? "" : " textInput__label--error");
    return (
        <div className={"textInput__wrapper " + className}>
            <div className={`textInput${valid !== -1 ? "" : "--error"}`}>
                {label ? <span className={labelStyle}>{label}</span> : ""}
                <form onSubmit={e => {
                    e.preventDefault();
                    updateValid() === 1 ? onSubmit(value) : null
                }}>
                    <input type="text" className="textInput__input"
                           onFocus={() => setFocused(true)}
                           onBlur={() => setFocused(value !== "")}
                           {...bind}/>
                </form>
            </div>
            {valid !== -1 ? "" :
                <span className="textInput__error">{inputTypes[type].error}</span>}
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