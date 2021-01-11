import React, {useState, useEffect} from 'react';
import "../scss/navBar.scss"
import profilePhoto from "../imgs/profilePhoto.svg"
import Dropdown from "../general_components/Dropdown";
import {Link} from "react-router-dom";
import axios from "axios";
//controls all of the nav bar.

//MenuBase = the entire nav bar

//NavMainMenu = the section on the right, that contains the logo the links to other pages and for admin, their profile,
//a toggle button

//innerMenu = section to the farther right, contains user's available pages, separator, profile, profile picture, and
//toggle button for teachers/admins

//toggleButton = toggle button can be removed (anything within the toggleButton class tag), and it is only for teachers.

export default (props) => {
    const [courses, setCourses] = useState([]);
    const title = {value : "COURSES", label : "COURSES"};
    const {pagePaths, adminRole} = props;
    const [currentOption, setCurrentOption] = useState(title);
    const [isAdmin, setisAdmin] = useState(false);
    const[firstName,setFirstName] = useState("");
    useEffect(()=> {
        axios.get('/api/t/teachers').then(({data}) => {
            console.log(data.firstName);
            setFirstName(data.firstName);
            setCourses(data.courses);
        })
    }, [])
    const name = `Hello, ${firstName}`;
    const dropOptions = courses.map((course) =>({label:course,value:course}));


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
                        <button className="logout">LOGOUT </button>
                    </div>

                </div>

            </div>

        </div>
    )

}