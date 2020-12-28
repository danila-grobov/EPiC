import React, {useState} from 'react';
import "../scss/navBarDropdown.scss"
import "../scss/navBar.scss"
import dropDownArrow from "../imgs/downArrow.svg";

//Controls the drop down, will include all of the functionality for that and what not.
//NavDropdown = the section on the left that lets teachers/admin decide which module they're looking at
export default (props) => {
    const {course} = props;
    return (
        <div className="navDropdown">
            <button className="dropbtn">Dropdown</button>
            <button className="dropbtn-2"><img src={dropDownArrow} alt="Dropdown icon" className="dropdown__icon"/></button>
        </div>
    )}
