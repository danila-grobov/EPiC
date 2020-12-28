import React, {useState} from 'react';
import "../scss/navBarDropdown.scss"
import "../scss/navBar.scss"
import dropDownArrow from "../imgs/downArrow.svg";

//Controls the drop down, will include all of the functionality for that and what not.
//NavDropdown = the section on the left that lets teachers/admin decide which module they're looking at
export default (props) => {
    const {courses} = props;
    return (
        <div className="dropdown">
        <div className="navDropdown">
            <button className="dropbtn">COURSES</button>
            <div className="dropdown-content">
                <a href="#">CSC2031</a>
                <a href="#">CSC2032</a>
                <a href="#">CSC2033</a>
                <a href="#">CSC2034</a>
                <a href="#">CSC2035</a>
            </div>
            <button className="dropbtn-2"><img src={dropDownArrow} alt="Dropdown icon" className="dropdown__icon"/></button>
            </div>

        </div>
    )}
