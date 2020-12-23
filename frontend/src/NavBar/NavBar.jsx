import React, {useState} from 'react';
import "../scss/navBar.scss"
import NavBar_Dropdown from "./NavBar_Dropdown";
//controls all of the nav bar.

//MenuBase = the entire nav bar
//NavDropdown = the section on the left that lets teachers/admin decide which module they're looking at
//NavMainMenu = the section on the right, that contains the logo the links to other pages and for admin, their profile,
//a toggle button

export default () => {
    return (
       <div className="menuBase">
           <div className = "navDropdown">
               
           </div>
           <div className="navMainMenu">
           </div>

       </div>

    )

}