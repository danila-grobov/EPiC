/**
 * @author Danila Grobov
 */
import React from "react";
import "../scss/table/tableButtons.scss";

/**
 * Displays button for table actions.
 */
export default props => {
    const {icon, title, onClick} = props;
    return (
        <div role="button" className="tableButton" onClick={onClick}>
            <img src={icon} alt={title} className="tableButton__icon"/>
            <span className="tableButton__title">{title}</span>
        </div>
    )
}