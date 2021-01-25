/**
 * @author Sofia Trevino
 */
import React, {useState} from 'react';
import "../scss/dropdown.scss"
import "../scss/navBar.scss"
import dropDownArrow from "../imgs/downArrow.svg";

/**
 * This component controls dropdown menus. It Takes an array of value/label objects called "dropOptions", and displays
 * them in a list, when the dropdownBase is clicked. CurrentOption displays the last-clicked object, which can be set
 * with setCurrentOption.
 */

export default (props) => {
    const {dropOptions, className="", currentOption, setCurrentOption} = props;
    const [isShown, setShow] = useState(false)

    return (
        <div className={"dropdown " + className} onBlur={ ()=> setShow(false)} tabIndex='-1'>

            <div onClick={ ()=> setShow(!isShown)} className="dropdownBase">
                <button className="dropbtn">{currentOption.label}</button>

                { isShown === true ? <div id= "dropdownContent" className="dropdown-content">
                    {dropOptions.map((dropOption) =>
                        <li><a onMouseDown={(event) => setCurrentOption(dropOption)}>{dropOption.label}</a></li>
                    )}

                </div> : ""}
                <button className="dropbtn-2"><img src={dropDownArrow} alt="Dropdown menu icon" className="dropdown__icon"/></button>
            </div>

        </div>

    )}