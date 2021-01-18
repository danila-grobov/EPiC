import React from "react"
import "../scss/button.scss"
import loading__orange from "../imgs/loading_orange.svg";
import loading__grey from "../imgs/loading_grey.svg";
import checkmark from "../imgs/checkmark.svg";
export default props => {
    const {height, label, onClick, type, status = "idle", width = "auto", loadingColor = "orange"} = props;
    const className = `button--${type} ` + props.className + ` button--${type}--${status}`;
    const content =
        status === "idle" ? <span className="button__label">{label}</span> :
        status === "loading" ? <img src={loadingColor === "grey" ? loading__grey : loading__orange}
                                    className={"button__loading"} alt="loading icon"/> :
        status === "done" ?
            <>
                <span className="button__label">{"Success!"}</span>
                <img src={checkmark} alt="checkmark" className="button__icon"/>
            </> :
        status === "error" ? <span className="button__label">{"Failure!"}</span> : "";
    return (
        <div className={className} style={{height, width}} onClick={onClick}>
            {content}
        </div>
    )
}