import React, {useState} from 'react';
import "../scss/dropdown.scss"
import "../scss/navBar.scss"
import dropDownArrow from "../imgs/downArrow.svg";

function buttonPush() {
    document.getElementById("dropdownContent").classList.toggle("show");
}


export default () => {

    return (
        <div className="dropdown">
            <div className="navDropdown">
                <button className="dropbtn">Filter</button>

                <div id= "dropdownContent" className="dropdown-content">
                    <ul>
                        <li><a href="#" >All Students</a></li>
                        <li><a href="#" >UK Students</a></li>
                        <li><a href="#" >EU Students</a></li>
                        <li><a href="#" >International Students</a></li>
                        <li><a href="#" >Men</a></li>
                        <li><a href="#" >Women</a></li>
                        <li><a href="#" >Non-Binary</a></li>
                        <li><a href="#" >Advanced Ability</a></li>
                        <li><a href="#" >Intermediate Ability</a></li>
                        <li><a href="#" >Beginner Ability</a></li>
                    </ul>
                </div>
                <button className="dropbtn-2"><img src={dropDownArrow} alt="Dropdown icon" className="dropdown__icon"/></button>
            </div>
        </div>
    )
}
