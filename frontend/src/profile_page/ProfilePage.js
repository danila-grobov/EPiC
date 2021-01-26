/**
 * @author Maxime Champagne
 */
import React, { useState } from "react";
import Button from "../general_components/Button";
import useValue from "../hooks/useValue";
import useValid from "../hooks/useValid";
import FancyInput from "../general_components/TextInput/FancyInput.jsx";
import Dropdown from "../general_components/Dropdown";
import "../scss/profile_page/profilePage.scss"
import axios from "axios";
import {toast} from "react-toastify";
import profilePhoto from "../imgs/profilePhoto.svg";
export default props => {
    const {email, userRole} = props;
    console.log(userRole);
    const [loadingState, setLoadingState] = useState("idle");
    const inputStates = {
        email: {...useValue(""), ...useValid("email")},
        firstName: {...useValue(""), ...useValid("text")},
        lastName: {...useValue(""), ...useValid("text")},
        userName: {...useValue(""), ...useValid("text")},
        password: {...useValue(""), ...useValid("password")},
        skill: {...useValue({label: "Skill Level", value: null})},
        studentType: {...useValue({label: "Student origin", value: null})},
    }
    const handleSubmit = () => {const inputsValid = Object.values(inputStates).reduce((valid, input) => {
            if (input.checkValidity)
                return input.checkValidity(input.value) && valid
            return valid
        }, true
    );
        if (inputsValid) {
            setLoadingState("loading");
            axios.put("/api/students", {
                Firstname: inputStates.firstName.value,
                Lastname: inputStates.lastName.value,
                Username: inputStates.userName.value,
                Skill: inputStates.skill.value.value,
                Email: email
            }).then(({data}) => {
                Object.keys(data).map(
                    errorType =>
                        inputStates[errorType] ? inputStates[errorType].setErrorMessage(data[errorType]) : null
                )
                if (data.global)
                    toast.error(data.global)
                if (!isEmpty(data)) {
                    setLoadingState("error");
                    setTimeout(() => setLoadingState("idle"), 1000);
                } else {
                    window.location = "/";
                }
            });
    }}
    return (
        <div className="profilePage">
            <img src={profilePhoto} alt="Your profile photo" className="profile_icon" height={100} width={100}/>
            <FancyInput label={"First name"} {...inputStates.firstName} width = "auto" />
          <FancyInput label={"Last name"} {...inputStates.lastName} width = "auto"/>
            <FancyInput label={"Username"} charLimit={20} {...inputStates.userName} width = "auto"/>
            <FancyInput type={"email"} label={"Email address"} className={"Profile_Page_Email"} charLimit={40}
                        {...inputStates.email} autoWidth={true}/>

            {userRole === "student" ? <Dropdown currentOption={inputStates.skill.value}
                      setCurrentOption={inputStates.skill.setValue}
                      dropOptions={[
                          {label: "Advanced", value: "Advanced"},
                          {label: "Intermediate", value: "Intermediate"},
                          {label: "Beginner", value: "Beginner"},
                          {label: "Prefer not to say", value: null}]}
                      className={"profilePage_dropdown"}/>: ""}
            <Button type={"secondary"} height={42} width = {188}label={"Change password"} className={"Profile_Page_ChangePass"}/>
            <Button type={"primary"} height={42} width={150}label={"SAVE"} className={"Profile_Page_Save"}
                    onClick={handleSubmit} status={loadingState}/>
        </div>)}