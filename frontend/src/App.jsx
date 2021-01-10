import React, {useState} from "react";
import ReactDOM from "react-dom";
import "./scss/app.scss";
import Courses from './teacher_task_view/Courses';
import Tasks from './teacher_task_view/Tasks';

const App = () =>{
    const [course, setCourse] = useState("Select Course");
    return(
        <div className="app">
            <h1>Teacher Task Page</h1>
            <Courses course={course} setCourse={setCourse}/>
            <Tasks course={course}/>
        </div>
    );
}
export default App;
ReactDOM.render(<App />, document.getElementById("root"));