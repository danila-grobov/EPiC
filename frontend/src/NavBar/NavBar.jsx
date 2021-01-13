import React, {useState, useEffect} from 'react';
import "../scss/navBar.scss"
import profilePhoto from "../imgs/profilePhoto.svg"
import Dropdown from "../general_components/Dropdown";
import Button from "../general_components/Button";
import {Link} from "react-router-dom";
import axios from "axios_redirect";
//controls all of the nav bar.

//MenuBase = the entire nav bar

//NavMainMenu = the section on the right, that contains the logo the links to other pages and for admin, their profile,
//a toggle button

//innerMenu = section to the farther right, contains user's available pages, separator, profile, profile picture, and
//toggle button for teachers/admins

//toggleButton = toggle button can be removed (anything within the toggleButton class tag), and it is only for teachers.

export default (props) => {
    const [courses, setCourses] = useState([]);
    const {pagePaths, currentOption, setCurrentOption, userRole} = props;
    const [isTeacher, setisTeacher] = useState(false);
    const[firstName,setFirstName] = useState("");

    if(userRole === "teacher"){
        useEffect(()=> {
            axios.get('/api/t/teachers').then(({data}) => {
                //console.log(data.firstName);
                setFirstName(data.firstName);
                setCourses(data.courses);
                setisTeacher(true);
                setCurrentOption({value : data.courses[0], label : data.courses[0] });
            })
        }, [])
    }


    const name = `Hello, ${firstName}`;
    const dropOptions = courses.map((course) =>({label:course,value:course}));


    return (
        <div className="menuBase">

            { isTeacher === true ? <Dropdown dropOptions={dropOptions} currentOption={currentOption}
                                               setCurrentOption={setCurrentOption} /> : ""}

            <div className={ "navMainMenu" + (isTeacher === false ? " navMainMenu--Student": "")}>

                <Link to="/home" className="epicLogo">EPiC</Link>


                <div className="innerMenu">

                    <div className= "pages">
                        {isTeacher === true ?  <ul className="ulStyle">
                            {pagePaths.map((page) =>
                                <li className="liStyle"><a className="pageName middle">{page}</a></li>
                            )}
                        </ul>: <ul className="ulStyle">
                            <li className="liStyle"><a className="pageName middle">
                                <Link to="/dashboard">HOME</Link></a></li>
                        </ul>  }


                    </div>

                    <div className="separator"/>

                    <Link to="/profile" className="userName">{name} </Link>
                    <img src={profilePhoto} alt="Your profile photo" className="profile__icon"/>

                    <Button height={32} label="LOGOUT" onClick={() => axios.get('/logout')}
                            type="primary" width={60}></Button>

                </div>

            </div>

        </div>
    )

}