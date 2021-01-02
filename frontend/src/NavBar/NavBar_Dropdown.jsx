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

    return (
        <div className="dropdown">
        <div className="navDropdown">
            <button className="dropbtn">COURSES</button>

            <div id= "dropdownContent" className="dropdown-content">

                {courses.map((course) =>
                    <li><a href="#" >{course}</a></li>
                    )}

            </div>
            <button className="dropbtn-2"><img src={dropDownArrow} alt="Dropdown icon" className="dropdown__icon"/></button>
            </div>

        </div>
    )}

