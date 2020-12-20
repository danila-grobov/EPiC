import React, {useState} from "react"
import "../scss/textInput.scss"

export default props => {
    const {width, label, value, onChange, className} = props;
    const [focused, setFocused] = useState(false);
    return (
        <div className={["textInput", className].join(" ")} style={{width: width}}>
            <span className={focused ? "textInput__label--focused" : "textInput__label"}>{label}</span>
            <input type="text" className="textInput__input"
                   onFocus={() => setFocused(true)} onBlur={() => setFocused(value !== "")}
                   value={value} onChange={onChange}/>
        </div>
    );
}