import React from "react"
import "../scss/button.scss"
import loadingAnimation from "../imgs/loading.svg";
import checkmark from "../imgs/checkmark.svg";
export default props => {
    const {height, label, onClick, type, status = "idle", width = "auto"} = props;
    const className = `button--${type} ` + props.className + ` button--${type}--${status}`;
    const content =
        status === "idle" ? <span className="button__label">{label}</span> :
        status === "loading" ? <img src={loadingAnimation} className={"button__loading"} alt="loading icon"/> :
        status === "done" ?
            <>
                <span className="button__label">{"Success!"}</span>
                <img src={checkmark} alt="checkmark" className="button__icon"/>
            </> : "";
    return (
        <div className={className} style={{height, width}} onClick={onClick}>
            {content}
        </div>
    )
}