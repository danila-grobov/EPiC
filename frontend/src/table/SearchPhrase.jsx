import React from "react"
import removeIcon from "../imgs/remove.svg";

export default props => {
    const {value, index, onDelete: handleDelete} = props;
    return (
        <div className="searchPhrase">
        <span className="searchPhrase__title">
            {value}
        </span>
            <img src={removeIcon} alt="remove icon" className="searchPhrase__remove"
                 onClick={() => handleDelete(index)}/>
        </div>
    )
}