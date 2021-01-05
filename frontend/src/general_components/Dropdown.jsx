import React, {useState} from 'react';
import "../scss/dropdown.scss"
import "../scss/navBar.scss"
import dropDownArrow from "../imgs/downArrow.svg";

//Controls the drop down, will include all of the functionality for that and what not.
//NavDropdown = the section on the left that lets teachers/admin decide which module they're looking at

function buttonPush() {
    document.getElementById("dropdownContent").classList.toggle("show");
}

export default (props) => {
    const {dropOptions, className="", currentOption, setCurrentOption} = props;
    const [isShown, setShow] = useState(false)



    return (
        <div className={"dropdown " + className} onBlur={ ()=> setShow(false)} tabIndex='-1'>

            <div onClick={ ()=> setShow(!isShown)} className="dropdownBase">
                <button className="dropbtn">{currentOption}</button>

                { isShown === true ? <div id= "dropdownContent" className="dropdown-content">
                    {dropOptions.map((dropOption) =>
                        <li><a onMouseDown={(event) => setCurrentOption(event.target.innerHTML)} href="#" >{dropOption}</a></li>
                    )}


                </div> : ""}
                <button className="dropbtn-2"><img src={dropDownArrow} alt="Dropdown menu icon" className="dropdown__icon"/></button>
            </div>

        </div>

    )}