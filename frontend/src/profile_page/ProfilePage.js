/**
 * @author Maxime Champagne
 */
import React, { useState } from "react";
import Button from "../general_components/Button";
import useValue from "../hooks/useValue";
import useValid from "../hooks/useValid";
import FancyInput from "../general_components/TextInput/FancyInput.jsx";
import Dropdown from "../general_components/Dropdown";
import "../scss/profile_page/ProfilePage.scss"
import axios from "axios";
import {toast} from "react-toastify";
import profilePhoto from "../imgs/profilePhoto.svg";
export default props => {
    const {email, userRole} = props;
    console.log(userRole);
    const [loadingState, setLoadingState] = useState("idle");
    //Gets input values ready for backend
    const inputStates = {
        email: {...useValue(""), ...useValid("email")},
        firstName: {...useValue(""), ...useValid("text")},
        lastName: {...useValue(""), ...useValid("text")},
        userName: {...useValue(""), ...useValid("text")},
        password: {...useValue(""), ...useValid("password")},
        skill: {...useValue({label: "Skill Level", value: null})},
    }
    const handleSubmit = () => {const inputsValid = Object.values(inputStates).reduce((valid, input) => {
            if (input.checkValidity)
                return input.checkValidity(input.value) && valid
            return valid
        }, true
    );
        if (inputsValid) {
            setLoadingState("loading");
            //Returns input values to backend
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
        <div className="ProfilePage">
            <img src={profilePhoto} alt="Your profile photo" className="profile_icon" height={100} width={100}/>
            <FancyInput label={"First name"} {...inputStates.firstName} width = "auto" />
          <FancyInput label={"Last name"} {...inputStates.lastName} width = "auto"/>
            <FancyInput label={"Username"} charLimit={20} {...inputStates.userName} width = "auto"/>
            <FancyInput type={"email"} label={"Email address"} className={"ProfilePageEmail"} charLimit={40}
                        {...inputStates.email} autoWidth={true}/>
                        {/*The dropdown only shows for students*/}
            {userRole === "student" ? <Dropdown currentOption={inputStates.skill.value}
                      setCurrentOption={inputStates.skill.setValue}
                      dropOptions={[
                          {label: "Advanced", value: "Advanced"},
                          {label: "Intermediate", value: "Intermediate"},
                          {label: "Beginner", value: "Beginner"},
                          {label: "Prefer not to say", value: null}]}
                      className={"profilePage_dropdown"}/>: ""}
            {/*Neither button currently works*/}
            <Button type={"secondary"} height={42} width = {188}label={"Change password"} className={"ProfilePageChangePass"}/>
            <Button type={"primary"} height={42} width={150}label={"SAVE"} className={"ProfilePageSave"}
                    onClick={handleSubmit} status={loadingState}/>
        </div>)}