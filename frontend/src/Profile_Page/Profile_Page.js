import React, { Component } from "react";
import "./app.scss";
import Profile from "../Profile";
import Button from "../general_components/Button";
import useValue from "../hooks/useValue";
import useValid from "../hooks/useValid";
import FancyInput from "../general_components/FancyInput";
import Dropdown from "../general_components/Dropdown";
import axios from "axios";
import {toast} from "react-toastify";
export default props => {
    const {inviteToken, email} = props;
    const [loadingState, setLoadingState] = useState("idle");
    const inputStates = {
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
    }
    return (
        <div className="registrationForm">
            <FancyInput label={"First name"} {...inputStates.firstName}/>
            <FancyInput label={"Last name"} {...inputStates.lastName}/>
            <FancyInput label={"Username"} charLimit={20} {...inputStates.userName}/>
            <Dropdown currentOption={inputStates.skill.value}
                      setCurrentOption={inputStates.skill.setValue}
                      dropOptions={[
                          {label: "Advanced", value: "Advanced"},
                          {label: "Intermediate", value: "Intermediate"},
                          {label: "Beginner", value: "Beginner"},
                          {label: "Prefer not to say", value: null}]}
                      className={"registrationForm__dropdown"}
            />
            <FancyInput type={"email"} label={"Email address"} className={"Profile_Page_Email"} charLimit={40}
                        value={email} disabled={true}/>
            <Button type={"primary"} height={42} label={"SAVE"} className={"Profile_Page_Save"}
                    onClick={handleSubmit} status={loadingState}/>
        </div>)}}