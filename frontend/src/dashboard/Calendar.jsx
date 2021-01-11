import React, {useLayoutEffect, useState} from "react"
import "../scss/app.scss"
import "../scss/dashboard/calendar.scss";
import winter_image from "../imgs/winter_calendar.png";
import CalendarTask from "./CalendarTask";
import moment from "moment";
import axios from "axios_redirect";
export default () => {
    const [tasks, setTasks] = useState([]);
    useLayoutEffect(
        () => {
            axios
                .get("/api/s/deadlines")
                .then(({data:deadlines}) => {
                    setTasks(deadlines)
                })
        },[]
    );
    const currMonth = moment().format("MMMM");
    const currDay = moment().format("D");
    return (
        <div className="calendar">
            <div className="calendar__info">
                <div className="calendar__todayMonth">
                    <span className="calendar__text">Today</span>
                    <span className="calendar__sepparator"/>
                    <span className="calendar__text">{currMonth}</span>
                </div>
                <div className="calendar__currentDate">
                    <span className="calendar__day">{currDay}</span>
                    <span className="calendar__month">{currMonth}</span>
                </div>
                <div className="calendar__tasks">
                    <span className="calendar__text">To-Do</span>
                    {
                        tasks.map((task,index) =>
                            <CalendarTask key={`calendarTask__${index}`} {...task} />
                        )
                    }
                </div>
            </div>
            <img src={winter_image} alt="decorative image" className="calendar__image"/>
        </div>
    )
}