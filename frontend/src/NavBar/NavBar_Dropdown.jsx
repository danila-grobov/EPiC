import React, {useState} from 'react';
import "../scss/dropdown.scss"
import "../scss/navBar.scss"
import dropDownArrow from "../imgs/downArrow.svg";

//Controls the drop down, will include all of the functionality for that and what not.
//NavDropdown = the section on the left that lets teachers/admin decide which module they're looking at

function buttonPush() {
    document.getElementById("dropdownContent").classList.toggle("show");
}

export default (props) => {
    const {courses} = props;
    const [currentCourse, setCurrentCourse] = useState("COURSES")
    const [isShown, setShow] = useState(false)


    return (
        <div className="dropdown">
        <div onClick={ ()=> setShow(!isShown)} className="navDropdown">
            <button className="dropbtn">{currentCourse}</button>

            { isShown === true ? <div id= "dropdownContent" className="dropdown-content">

                {courses.map((course) =>
                    <li><a onClick={(event) => setCurrentCourse(event.target.innerHTML)} href="#" >{course}</a></li>
                    )}

            </div> : ""}
            <button className="dropbtn-2"><img src={dropDownArrow} alt="Dropdown menu icon" className="dropdown__icon"/></button>
            </div>

        </div>
    )}

