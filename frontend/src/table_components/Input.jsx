import React, {useState} from "react"
import "../scss/textInput.scss"

export default props => {
    const {width, label, value, onChange, className, error, valid} = props;
    const [focused, setFocused] = useState(false);
    return (
        <div className={["textInput__wrapper", className].join(" ")}>
            <div className={`textInput${valid !== -1 ? "" : "--error"}`} style={{width: width - 42}}>
                <span className={[focused ? "textInput__label--focused" : "textInput__label",
                    valid !== -1 ? "" : "textInput__label--error"].join(" ")}>{label}</span>
                <input type="text" className="textInput__input"
                       onFocus={() => setFocused(true)} onBlur={() => setFocused(value !== "")}
                       value={value} onChange={onChange}/>
            </div>
            {valid !== -1 ? "" : <span className="textInput__error" style={{width: width}}>{error}</span>}
        </div>

    );
}