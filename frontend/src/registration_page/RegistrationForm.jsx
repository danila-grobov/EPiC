import React from "react"
import FancyInput from "../general_components/FancyInput";
import "../scss/registration_page/registrationForm.scss";
import NavBar_Dropdown from "../NavBar/NavBar_Dropdown";
import Button from "../general_components/Button";
export default () => {
    return (
        <div className="registrationForm">
            <FancyInput label={"First name"}/>
            <FancyInput label={"Last name"}/>
            <FancyInput label={"Username"} charLimit={20}/>
            <NavBar_Dropdown courses={["Advanced", "Intermediate", "Beginner"]}/>
            <NavBar_Dropdown courses={["Male", "Female", "Non-Binary"]}/>
            <NavBar_Dropdown courses={["UK Students", "EU Students", "International Students"]}/>
            <FancyInput label={"Password"} type={"password"} charCounter={false}/>
            <FancyInput label={"Confirm password"} type={"password"} charCounter={false}/>
            <FancyInput type={"email"} label={"Email address"}
                        className={"registrationForm__email"} charLimit={40}/>
            <Button type={"primary"} height={42} label={"REGISTER"} className={"registrationForm__button"}/>
        </div>
    )
}