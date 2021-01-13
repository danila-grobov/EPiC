import React from "react"
import "../scss/dashboard/calendarTask.scss"
export default props => {
    const {name, deadline, color} = props;
    return (
        <div className="calendarTask">
            <div className="calendarTask__color" style={{backgroundColor:color}}/>
            <div className="calendarTask__info">
                <span>{name}</span>
                <div className="calendarTask__sepparator"/>
                <span>{deadline}</span>
            </div>
        </div>
    )
}