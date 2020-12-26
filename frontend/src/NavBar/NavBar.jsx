import React, {useState} from 'react';
import "../scss/navBar.scss"
import dropDownArrow from "../imgs/downArrow.svg"
import profilePhoto from "../imgs/profilePhoto.svg"
//controls all of the nav bar.

//MenuBase = the entire nav bar
//NavDropdown = the section on the left that lets teachers/admin decide which module they're looking at
//NavMainMenu = the section on the right, that contains the logo the links to other pages and for admin, their profile,
//a toggle button

export default (props) => {
    const {course, epic, pages, name, teacher, admin} = props;

    return (
        <div className="menuBase">
            <div className="navDropdown">
                <span className="courseName">{course}</span>
                <img src={dropDownArrow} alt="Dropdown icon" className="dropdown__icon"/>
            </div>



            <div className="navMainMenu">

                <span className="epicLogo"> {epic}</span>

                <div className="innerMenu">
                    <div className= "pages">
                        {pages.map((page) =>
                            <span className="pageName">{page}</span>
                        )}
                    </div>

                    <div className="separator"/>

                    <span className="userName">{name}</span>
                    <img src={profilePhoto} alt="Profile photo" className="profile__icon"/>

                    <div className="toggleButton">
                        <span className="teacher">{teacher}</span>
                        <span className="admin">{admin}</span>
                    </div>

                </div>

            </div>

        </div>
    )

}