import React, {useState} from "react"
import "../scss/textInput.scss"
import useInput from "../hooks/useInput";

export default props => {
    const {className, onSubmit, charLimit, listeners} = props;
    const {bind, value} = useInput("", charLimit);
    return (
        <form onSubmit={e => {e.preventDefault();onSubmit(value);}}>
            <input type="text" className={className} {...bind} {...listeners}/>
        </form>
    );

}