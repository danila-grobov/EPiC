import React, {useState} from 'react';
import "../scss/navBar.scss"
import dropDownArrow from "../imgs/downArrow.svg"
//controls all of the nav bar.

//MenuBase = the entire nav bar
//NavDropdown = the section on the left that lets teachers/admin decide which module they're looking at
//NavMainMenu = the section on the right, that contains the logo the links to other pages and for admin, their profile,
//a toggle button

export default () => {
    const course = "CSC2033";

    return (
       <div className="menuBase">
           <div className = "navDropdown" course = {course}>
               <img src={dropDownArrow} alt="Dropdown icon" className="dropdown__icon"/>
           </div>
           <div className="navMainMenu">
           </div>

       </div>
    )

}