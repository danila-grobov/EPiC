import React, {useState, useLayoutEffect} from "react"
import "../scss/course_page/deadlines.scss";
import ScrollableContainer from "../general_components/ScrollableContainer";
import axios from "axios_redirect";

export default ({course}) => {
    const [deadlines, setDeadlines] = useState([]);
    useLayoutEffect(() => {
        axios
            .get('/api/s/deadlines', {params: {course}})
            .then(({data: deadlines}) => {
                console.log(deadlines);
                setDeadlines(deadlines)
            })
    }, [course]);
    return (
        <div className="deadlines">
            <span className="deadlines__title">Deadlines</span>
            <ScrollableContainer className={"deadlines__taskWrapper"}>
                {
                    deadlines.length > 0 ?
                    deadlines.map((deadline, index) => (
                        <div key={`deadlines__${index}`} className="deadlines__task">
                            <div className={
                                `deadlines__statusCircle ${deadline.completed ? "deadlines__statusCircle--filled" : ""}`
                            }/>
                            <span className="deadlines__taskTitle">{deadline.title}</span>
                            <span className="deadlines__date">{deadline.date}</span>
                        </div>
                    )) : <span className="deadlines__noDeadlines">There are no deadlines for this course.</span>
                }
            </ScrollableContainer>
        </div>
    )
}