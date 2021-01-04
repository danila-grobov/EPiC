import React from "react"
import FancyInput from "../general_components/FancyInput";
import "../scss/registration_page/registrationForm.scss";
export default () => {
    return (
        <div className="registrationForm">
            <FancyInput label={"First name"}/>
            <FancyInput label={"Last name"}/>
            <FancyInput label={"Username"}/>
            <FancyInput label={"Password"} type={"password"}/>
            <FancyInput label={"Confirm password"} type={"password"}/>
            <FancyInput type={"email"} label={"Email address"}
                        className={"registrationForm__email"}/>
        </div>
    )
}