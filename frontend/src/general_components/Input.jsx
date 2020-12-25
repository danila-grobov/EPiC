import React, {useState} from "react"
import "../scss/textInput.scss"
import useValue from "../hooks/useValue";

export default props => {
    const {className, onSubmit, charLimit, listeners} = props;
    const {bind, value} = useValue("");
    return (
        <form onSubmit={e => {e.preventDefault();onSubmit(value);}}>
            <input type="text" maxLength={charLimit} className={className} {...bind} {...listeners}/>
        </form>
    );

}