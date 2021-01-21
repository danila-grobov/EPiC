import React, {useState} from "react";
import "./scss/app.scss";
import NavBar from "./NavBar/NavBar";
import TasksStudent from "./task_view/student/TasksStudent";
import TasksTeacher from "./task_view/teacher/TasksTeacher";

const App = () =>{
    const [user, setUser] = useState("student"); // for now select manually between 'student' and 'teacher'
    const [currentOption, setCurrentOption] = useState({value: "", label: "Select Course"});
    const pages = ["HOME", "TASKS", "MANAGE"];
    const pagePaths = ["dsfasd", "./tasks.jsx", "./manage.jsx"];
    const name = "Hello, Dwight";

    return(
        <div className="app">
            <NavBar  pages={pages} pagePaths={pagePaths} name={name}
                     adminRole={false} currentOption={currentOption} setCurrentOption={setCurrentOption}/>
            {user === "student"?
                <TasksStudent course={currentOption.value}/>: user==="teacher"?
                <TasksTeacher course={currentOption.value}/>: "User not recognised"}

        </div>
    );
}
export default App;