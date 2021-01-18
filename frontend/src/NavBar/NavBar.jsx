import React, {useState, useEffect} from 'react';
import "../scss/navBar.scss"
import profilePhoto from "../imgs/profilePhoto.svg"
import Dropdown from "../general_components/Dropdown";
import Button from "../general_components/Button";
import {Link, useLocation} from "react-router-dom";

import axios from "axios_redirect";
//controls all of the nav bar.

//MenuBase = the entire nav bar

//NavMainMenu = the section on the right, that contains the logo the links to other pages and for admin, their profile,
//a toggle button

//innerMenu = section to the farther right, contains user's available pages, separator, profile, profile picture, and


export default (props) => {
    const {currentOption, setCurrentOption, userRole, pagePaths} = props;
    const [courses, setCourses] = useState([]); //courses for the dropdown menu on teacher nav-bars
    const dropOptions = courses.map((course) =>({label:course,value:course}));
    const[firstName,setFirstName] = useState(""); //sets the user's first name in the nav-bar
    let currentPath = useLocation(); //gets the current path/route

    //retrieving data from the backend
    if(userRole === "teacher"){
        useEffect(()=> {
            axios.get('/api/t/teachers').then(({data}) => {
                console.log(data.firstName);
                setFirstName(data.firstName);
                setCourses(data.courses);
                setCurrentOption({value : data.courses[0], label : data.courses[0] });
            })
        }, [])
    }
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
                            type="primary" width={60}></Button>

                </div>

            </div>

        </div>
    )

}