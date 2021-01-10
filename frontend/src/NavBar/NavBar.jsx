import React, {useState} from 'react';
import "../scss/navBar.scss"
import profilePhoto from "../imgs/profilePhoto.svg"
import Dropdown from "../general_components/Dropdown";
import {Link} from "react-router-dom";
//controls all of the nav bar.

//MenuBase = the entire nav bar

//NavMainMenu = the section on the right, that contains the logo the links to other pages and for admin, their profile,
//a toggle button

//innerMenu = section to the farther right, contains user's available pages, separator, profile, profile picture, and
//toggle button for teachers/admins

//toggleButton = toggle button can be removed (anything within the toggleButton class tag), and it is only for teachers.

export default (props) => {
    const dropOptions = [{value: "CSC2031", label: "CSC2031"},{value:"CSC2032", label: "CSC2032"},
        {value:"CSC2033", label:"CSC2033"},{value:"CSC2034", label:"CSC2034"},{value:"CSC2035", label:"CSC2035"}];
    const title = {value : "COURSES", label : "COURSES"};
    const {pagePaths, name, adminRole} = props;
    const [currentOption, setCurrentOption] = useState(title);
    const [isAdmin, setisAdmin] = useState(false);


    return (
        <div className="menuBase">

            <Dropdown dropOptions={dropOptions} currentOption={currentOption} setCurrentOption={setCurrentOption} />

            <div className="navMainMenu">

                <Link to="/home" className="epicLogo">EPiC</Link>


                <div className="innerMenu">

                    <div className= "pages">
                        <ul className="ulStyle">
                            {pagePaths.map((page) =>
                                <li className="liStyle"><a className="pageName middle">{page}</a></li>
                            )}
                        </ul>
                    </div>


                    <div className="separator"/>


                    <Link to="/profile" className="userName">{name} </Link>
                    <img src={profilePhoto} alt="Your profile photo" className="profile__icon"/>

                    <div>

                    </div>

                    <div className="logOut"></div>

                </div>

            </div>

        </div>
    )

}