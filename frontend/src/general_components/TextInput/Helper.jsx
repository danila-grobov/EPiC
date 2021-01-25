import React from "react"
import right_button from "../../imgs/right_button.svg";

export default ({helper, autoComplete, focused, value, type}) => {
    if(focused && value && type === "email" && helper)
        return (
            <span className="textInput__helper">
                {helper}
                <img src={right_button} alt="right key" onClick={autoComplete} className="textInput__helperImg"/>
            </span>
        );
    return null;
}