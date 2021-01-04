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

//toggleButton = toggle button can be removed (anything within the toggleButton class tag), and it is only for teachers.

export default (props) => {
    const courses = ["CSC2031","CSC2032","CSC2033","CSC2034","CSC2035"];
    const {pages, pagePaths, name, adminRole} = props;
    //const [currentCourse, setCurrentCourse] = useState("CSC2033")
    const [isAdmin, setisAdmin] = useState(false);


    return (
        <div className="menuBase">

            <NavBar_Dropdown courses={courses}/>

            <div className="navMainMenu">

                <span className="epicLogo"> EPiC </span>

                <div className="innerMenu">
                    <div className= "pages">
                        <ul className="ulStyle">
                            {pages.map((page,index) =>
                               <li className="liStyle"><a href={pagePaths[index]} className="pageName middle">{page}</a></li>
                            )}
                        </ul>
                    </div>

                    <div className="separator"/>

                    <a href="./profile.jsx" className="userName">{name}</a>
                    <img src={profilePhoto} alt="Your profile photo" className="profile__icon"/>

                    { adminRole === true ? <div className="toggleButton" >
                        <label className="switch">
                            <input type="checkbox"  onClick={ ()=> setisAdmin(!isAdmin)}></input>
                            <span className="slider round"></span>
                        </label>
                        <div className="links">
                            <span className={!isAdmin ? "linkActive": "linkNotActive"}>TEACHER</span>
                            <span className={!isAdmin ? "linkNotActive": "linkActive"}>ADMIN</span>
                        </div>
                    </div>: ""}

                </div>

            </div>

        </div>
    )

}