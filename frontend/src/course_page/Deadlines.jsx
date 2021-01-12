import React, {useState} from "react"
import "../scss/course_page/deadlines.scss";
import ScrollableContainer from "../general_components/ScrollableContainer";
export default props => {
    const {name} = props;
    const [deadlines, setDeadlines] = useState([
        {
            completed: true,
            title: "Task 1",
            date: "13 Jan 2020"
        },
        {
            completed: false,
            title: "Longer task title",
            date: "18 Dec 2020"
        },
        {
            completed: false,
            title: "Task 2",
            date: "18 Dec 2020"
        },
        {
            completed: true,
            title: "Very long task title Very long task title Very long task title Very long task title",
            date: "01 Dec 2020"
        },
        {
            completed: true,
            title: "Task 3",
            date: "31 Dec 2020"
        }
    ])
    return (
        <div className="deadlines">
            <span className="deadlines__title">Deadlines</span>
            <ScrollableContainer className={"deadlines__taskWrapper"}>
                {
                    deadlines.map(deadline => (
                        <div className="deadlines__task">
                            <div className={
                                `deadlines__statusCircle ${deadline.completed ? "deadlines__statusCircle--filled" : ""}`
                            }/>
                            <span className="deadlines__taskTitle">{deadline.title}</span>
                            <span className="deadlines__date">{deadline.date}</span>
                        </div>
                    ))
                }
            </ScrollableContainer>
        </div>
    )
}