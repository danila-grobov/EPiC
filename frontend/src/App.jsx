import React, {useState} from "react";
import ReactDOM from "react-dom";
import "./scss/app.scss";
import Courses from './task_view/Courses';
import Tasks from './task_view/Tasks';

const App = () =>{
    const [course, setCourse] = useState("Select Course");
    const [user, setUser] = useState("student"); // for now select manually between 'student' and 'teacher'
    return(
        <div className="app">
            <h1>Teacher Task Page</h1>
            <Courses course={course} setCourse={setCourse}/>
            <Tasks course={course} user={user}/>
        </div>
    );
}
export default App;
ReactDOM.render(<App />, document.getElementById("root"));