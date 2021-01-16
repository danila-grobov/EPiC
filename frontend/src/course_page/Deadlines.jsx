import React, {useState, useLayoutEffect} from "react"
import "../scss/course_page/deadlines.scss";
import ScrollableContainer from "../general_components/ScrollableContainer";
import axios from "axios_redirect";

export default props => {
    const {name} = props;
    const [deadlines, setDeadlines] = useState([]);
    useLayoutEffect(() => {
        axios
            .get('/api/s/deadlines', {params: {course: name}})
            .then(({data: deadlines}) => {
                setDeadlines(deadlines)
            })
    }, [])
    return (
        <div className="deadlines">
            <span className="deadlines__title">Deadlines</span>
            <ScrollableContainer className={"deadlines__taskWrapper"}>
                {
                    deadlines.map((deadline, index) => (
                        <div key={`deadlines__${index}`} className="deadlines__task">
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