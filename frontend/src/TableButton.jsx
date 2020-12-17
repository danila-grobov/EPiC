import React from "react"
import "./scss/tableButtons.scss"
export default props => {
    const {icon, title} = props;
    return (
        <div className="tableButton">
            <img src={icon} alt={title} className="tableButton__icon"/>
            <span className="tableButton__title">{title}</span>
        </div>
    )
}