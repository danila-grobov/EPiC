/**
 * @author Sofia Trevino
 */
import React, {useState, useEffect} from 'react';
import "../scss/navBar.scss"
import profilePhoto from "../imgs/profilePhoto.svg"
import Dropdown from "../general_components/Dropdown";
import Button from "../general_components/Button";
import {Link, useLocation} from "react-router-dom";
import axios from "axios_redirect";

/**
 * This component controls all of the navigation bar. It is written in a way that it recognises the role of the current
 * user and changes the nav-bar accordingly. The MenuBase div holds the entire navigation bar. Teacher view nav-bars
 * has a dropdown and beside it, the NavMainMenu. Student view does not have access to the dropdown, and therefore only
 * has NavMainMenu--Student. Within both NavMainMenus, there is the innerMenu, which holds the page names, separator,
 * profile link, profile picture, and a logout button.
 */

export default (props) => {
    const {currentOption, setCurrentOption, userRole, pagePaths} = props;
    const [courses, setCourses] = useState([]); //courses for the dropdown menu on teacher nav-bars
    const dropOptions = courses.map((course) =>({label:course,value:course}));
    const[firstName,setFirstName] = useState(""); //sets the user's first name in the nav-bar
    let currentPath = useLocation(); //gets the current path/route

    //retrieving data from the backend for teachers (their first name, as well as the modules they teach).
    if(userRole === "teacher"){
        useEffect(()=> {
            axios.get('/api/t/teachers').then(({data}) => {
                setFirstName(data.firstName);
                setCourses(data.courses);
                setCurrentOption({value : data.courses[0], label : data.courses[0] });
            })
        }, [])
    }
    //retrieving data from the backed for students (their first name).
    if(userRole === "student"){
        useEffect(()=> {
            axios.get('/api/s/student').then(({data}) => {
                setFirstName(data);
            })
        }, [])
    }

    const name = `Hello, ${firstName}`;

    return (
        <div className="menuBase">

            { userRole === "teacher" ? <Dropdown dropOptions={dropOptions} currentOption={currentOption}
                                               setCurrentOption={setCurrentOption} /> : ""}

            <div className={ "navMainMenu" + (userRole === "student" ? " navMainMenu--Student": "")}>

                <Link to="/home" className="epicLogo">EPiC</Link>

                <div className="innerMenu">

                    <div className= "pages">
                        <ul className="ulStyle">
                            {pagePaths.map((page) =>
                                <li className={(page.path === currentPath.pathname ? "pageName pageNameActive liStyle":"pageName liStyle")}>
                                    {page.link}</li>)}
                        </ul>
                    </div>

                    <div className="separator"/>

                    <Link to="/profile" className="userName">{name}</Link>
                    <img src={profilePhoto} alt="Your profile photo" className="profile__icon"/>

                    <Button height={32} label="LOGOUT" onClick={() => axios.get('/logout')}
                            type="primary" width={60}/>

                </div>

            </div>

        </div>
    )

}