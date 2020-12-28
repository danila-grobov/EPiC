import React, {useState} from 'react';
import "../scss/navBar.scss"
import NavBar_Dropdown from "./NavBar_Dropdown";
import dropDownArrow from "../imgs/downArrow.svg"
import profilePhoto from "../imgs/profilePhoto.svg"
//controls all of the nav bar.

//MenuBase = the entire nav bar

//NavMainMenu = the section on the right, that contains the logo the links to other pages and for admin, their profile,
//a toggle button

//innerMenu = section to the farther right, contains user's available pages, separator, profile, profile picture, and
//toggle button for teachers/admins

export default (props) => {
    const {courses, epic, pages, name, teacher, admin} = props;
    const [isAdmin, setisAdmin] = useState(false);

    return (
        <div className="menuBase">

            <NavBar_Dropdown courses={courses}/>

            <div className="navMainMenu">
                <span className="epicLogo"> {epic}</span>

                <div className="innerMenu">
                    <div className= "pages">
                        <ul>
                            {pages.map((page) =>
                               <li><a href="#" className="pageName middle">{page}</a></li>
                            )}
                        </ul>
                    </div>

                    <div className="separator"/>

                    <span className="userName">{name}</span>
                    <img src={profilePhoto} alt="Profile photo" className="profile__icon"/>

                    <div className="toggleButton">

                        <label className="switch">
                            <input type="checkbox"  onClick={ ()=> setisAdmin(!isAdmin)}></input>
                            <span className="slider round"></span>
                        </label>
                        <div className="links">
                            <span className={!isAdmin ? "linkActive": "linkNotActive"}>{teacher}</span>
                            <span className={!isAdmin ? "linkNotActive": "linkActive"}>{admin}</span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )

}