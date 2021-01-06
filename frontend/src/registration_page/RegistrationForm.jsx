import React from "react"
import FancyInput from "../general_components/FancyInput";
import "../scss/registration_page/registrationForm.scss";
import Button from "../general_components/Button";
import useValue from "../hooks/useValue";
import useValid from "../hooks/useValid";
import axios from "axios";
import {toast} from "react-toastify";
import Dropdown from "../general_components/Dropdown";
import "../scss/app.scss";
export default props => {
    const {inviteToken, email} = props;
    const inputStates = {
        firstName: {...useValue(""), ...useValid("text")},
        lastName: {...useValue(""), ...useValid("text")},
        userName: {...useValue(""), ...useValid("text")},
        password: {...useValue(""), ...useValid("password")},
        confirmPassword: {...useValue(""), ...useValid("password")},
        skill: {...useValue({label: "Skill Level", value: null})},
        studentType: {...useValue({label: "Student origin", value: null})},
        gender: {...useValue({label: "Gender", value:null})},
    }
    const handleSubmit = () => {
        const inputsValid = Object.values(inputStates).reduce((valid, input) => {
                if (input.checkValidity)
                    return input.checkValidity(input.value) && valid
                return true;
            }, true
        );
        const passwordsMatch = inputStates.password.value === inputStates.confirmPassword.value;
        if (inputsValid && passwordsMatch)
            axios.put("/api/students", {
                Firstname: inputStates.firstName.value,
                Lastname: inputStates.lastName.value,
                Username: inputStates.userName.value,
                Pwd: inputStates.password.value,
                Skill: inputStates.skill.value.value,
                StudentType: inputStates.studentType.value.value,
                Gender: inputStates.gender.value.value,
                Email: email,
                token: inviteToken
            }).then(({data}) => {
                Object.keys(data).map(
                    errorType =>
                        inputStates[errorType] ? inputStates[errorType].setErrorMessage(data[errorType]) : null
                )
                if (data.global)
                    toast.error(data.global)
                if (isEmpty(data))
                    toast.success("You have been registered!")
            });
        else if (!passwordsMatch) {
            inputStates.password.setErrorMessage("The passwords do not match.");
            inputStates.confirmPassword.setErrorMessage("The passwords do not match.");
        }
    }
    return (
        <div className="registrationForm">
            <FancyInput label={"First name"} {...inputStates.firstName}/>
            <FancyInput label={"Last name"} {...inputStates.lastName}/>
            <FancyInput label={"Username"} charLimit={20} {...inputStates.userName}/>
            <Dropdown currentOption={inputStates.skill.value}
                      setCurrentOption={inputStates.skill.setValue}
                      dropOptions={[
                          {label:"Advanced", value: "Advanced"},
                          {label:"Intermediate", value: "Intermediate"},
                          {label:"Beginner", value: "Beginner"},
                          {label:"Prefer not to say", value: null}]}
                      className={"registrationForm__dropdown"}
            />
            <Dropdown currentOption={inputStates.gender.value}
                      setCurrentOption={inputStates.gender.setValue}
                      dropOptions={[
                          {label: "Male", value:"Male"},
                          {label: "Female", value: "Female"},
                          {label: "Non-Binary", value: "Non-Binary"},
                          {label: "Prefer not to say", value: null}
                      ]}
                      className={"registrationForm__dropdown"}
            />
            <Dropdown currentOption={inputStates.studentType.value}
                      setCurrentOption={inputStates.studentType.setValue}
                      dropOptions={[
                          {label:"UK Students", value: "UK Students"},
                          {label:"EU Students", value: "EU Students"},
                          {label:"International Students", value:"International Students"},
                          {label:"Prefer not to say", value:null}
                      ]}
                      className={"registrationForm__dropdown"}
            />
            <FancyInput label={"Password"} type={"password"} charCounter={false} charLimit={30}
                        {...inputStates.password}/>
            <FancyInput label={"Confirm password"} type={"password"} charCounter={false} charLimit={30}
                        {...inputStates.confirmPassword}/>
            <FancyInput type={"email"} label={"Email address"} className={"registrationForm__email"} charLimit={40}
                        value={email} disabled={true}/>
            <Button type={"primary"} height={42} label={"REGISTER"} className={"registrationForm__button"}
                    onClick={handleSubmit}/>
        </div>
    )
}

function isEmpty(object) {
    return Object.keys(object).length === 0 && object.constructor === Object;
}