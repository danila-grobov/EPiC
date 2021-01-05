import React from "react"
import FancyInput from "../general_components/FancyInput";
import "../scss/registration_page/registrationForm.scss";
import NavBar_Dropdown from "../NavBar/NavBar_Dropdown";
import Button from "../general_components/Button";
import useValue from "../hooks/useValue";
import useValid from "../hooks/useValid";
import axios from "axios";
import {toast} from "react-toastify";

export default props => {
    const {inviteToken} = props;
    const inputStates = {
        firstName: {...useValue(""), ...useValid("text")},
        lastName: {...useValue(""), ...useValid("text")},
        userName: {...useValue(""), ...useValid("text")},
        password: {...useValue(""), ...useValid("password")},
        confirmPassword: {...useValue(""), ...useValid("password")},
        email: {...useValue(""), ...useValid("email")},
        skill: {...useValue(null)},
        studentType: {...useValue(null)},
        gender: {...useValue(null)},
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
                Skill: inputStates.skill.value,
                StudentType: inputStates.studentType.value,
                Gender: inputStates.gender.value,
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
        else if(!passwordsMatch) {
            inputStates.password.setErrorMessage("The passwords do not match.");
            inputStates.confirmPassword.setErrorMessage("The passwords do not match.");
        }
    }
    return (
        <div className="registrationForm">
            <FancyInput label={"First name"} {...inputStates.firstName}/>
            <FancyInput label={"Last name"} {...inputStates.lastName}/>
            <FancyInput label={"Username"} charLimit={20} {...inputStates.userName}/>
            <NavBar_Dropdown courses={["Advanced", "Intermediate", "Beginner"]}/>
            <NavBar_Dropdown courses={["Male", "Female", "Non-Binary"]}/>
            <NavBar_Dropdown courses={["UK Students", "EU Students", "International Students"]}/>
            <FancyInput label={"Password"} type={"password"} charCounter={false} charLimit={30}
                        {...inputStates.password}/>
            <FancyInput label={"Confirm password"} type={"password"} charCounter={false} charLimit={30}
                        {...inputStates.confirmPassword}/>
            <FancyInput type={"email"} label={"Email address"} className={"registrationForm__email"} charLimit={40}
                        {...inputStates.email}/>
            <Button type={"primary"} height={42} label={"REGISTER"} className={"registrationForm__button"}
                    onClick={handleSubmit}/>
        </div>
    )
}
function isEmpty(object) {
    return Object.keys(object).length === 0 && object.constructor === Object;
}