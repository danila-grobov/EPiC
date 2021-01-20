import React from "react"
import removeIcon from "../imgs/remove.svg";

export default props => {
    const {value, index, onDelete: handleDelete} = props;
    return (
        <div className="searchPhrase" role={"listitem"} aria-label={"filter"}>
            <span className="searchPhrase__title">
                {value}
            </span>
            <img src={removeIcon} role={"button"} aria-label={"remove filter"} className="searchPhrase__remove"
                 onClick={() => handleDelete(index)}/>
        </div>
    )
}