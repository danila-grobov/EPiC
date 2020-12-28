import React, {useState} from 'react';
import "../scss/navBarDropdown.scss"
import dropDownArrow from "../imgs/downArrow.svg";


//<img src={dropDownArrow} alt="Dropdown icon" className="dropdown__icon"/>

//Controls the drop down, will include all of the functionality for that and what not.
export default (props) => {
    const {course} = props;
    return (
        <div className="navDropdown">
            <span className="courseName">{course}</span>
            <img src={dropDownArrow} alt="Dropdown icon" className="dropdown__icon"/>
        </div>
    )}
