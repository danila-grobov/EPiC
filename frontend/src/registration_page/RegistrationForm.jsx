import React, {useState} from "react"
import FancyInput from "../general_components/TextInput/FancyInput";
import "../scss/registration_page/registrationForm.scss";
import Button from "../general_components/Button";
import useValue from "../hooks/useValue";
import useValid from "../hooks/useValid";
import axios from "axios_redirect";
import {toast} from "react-toastify";
import Dropdown from "../general_components/Dropdown";
import "../scss/app.scss";
import md5 from "md5";
export default props => {
    const {inviteToken, email} = props;
    const [loadingState, setLoadingState] = useState("idle");
    const inputStates = {
        firstName: {...useValue(""), ...useValid("text")},
        lastName: {...useValue(""), ...useValid("text")},
        userName: {...useValue(""), ...useValid("text")},
        password: {...useValue(""), ...useValid("password")},
        confirmPassword: {...useValue(""), ...useValid("password")},
        skill: {...useValue({label: "Skill Level", value: null})},
        studentType: {...useValue({label: "Student origin", value: null})},
        gender: {...useValue({label: "Gender", value: null})},
    }
    const handleSubmit = () => {
        const inputsValid = Object.values(inputStates).reduce((valid, input) => {
                if (input.checkValidity)
                    return input.checkValidity(input.value) && valid
                return valid
            }, true
        );
        const passwordsMatch = inputStates.password.value === inputStates.confirmPassword.value;
        if (inputsValid && passwordsMatch) {
            setLoadingState("loading");
            axios.put("/api/register", {
                Firstname: inputStates.firstName.value,
                Lastname: inputStates.lastName.value,
                Username: inputStates.userName.value,
                Pwd: md5(inputStates.password.value),
                Skill: inputStates.skill.value.value,
                StudentType: inputStates.studentType.value.value,
                Gender: inputStates.gender.value.value,
                Email: email,
                token: inviteToken
            }).then(({data:errors}) => {
                console.log(errors);
                Object.keys(errors).map(
                    errorType =>
                        inputStates[errorType] ? inputStates[errorType].setErrorMessage(errors[errorType]) : null
                )
                if (errors.global)
                    toast.error(errors.global)
                setLoadingState("error");
                setTimeout(() => setLoadingState("idle"), 1000);
            });
        } else {
            if (!passwordsMatch) {
                inputStates.password.setErrorMessage("The passwords do not match.");
                inputStates.confirmPassword.setErrorMessage("The passwords do not match.");
            }
            setLoadingState("error");
            setTimeout(() => setLoadingState("idle"), 1000);
        }
    }
    return (
        <div className="registrationForm">
            <FancyInput onSubmit={handleSubmit} label={"First name"} {...inputStates.firstName} width={"auto"}/>
            <FancyInput onSubmit={handleSubmit} label={"Last name"} {...inputStates.lastName} width={"auto"}/>
            <FancyInput onSubmit={handleSubmit} label={"Username"} maxLength={20}
                        {...inputStates.userName} width={"auto"}/>
            <Dropdown currentOption={inputStates.skill.value}
                      setCurrentOption={inputStates.skill.setValue}
                      dropOptions={[
                          {label: "Advanced", value: "Advanced"},
                          {label: "Intermediate", value: "Intermediate"},
                          {label: "Beginner", value: "Beginner"},
                          {label: "Prefer not to say", value: null}]}
                      className={"registrationForm__dropdown"}
            />
            <Dropdown currentOption={inputStates.gender.value}
                      setCurrentOption={inputStates.gender.setValue}
                      dropOptions={[
                          {label: "Male", value: "Male"},
                          {label: "Female", value: "Female"},
                          {label: "Non-Binary", value: "Non-Binary"},
                          {label: "Prefer not to say", value: null}
                      ]}
                      className={"registrationForm__dropdown"}
            />
            <Dropdown currentOption={inputStates.studentType.value}
                      setCurrentOption={inputStates.studentType.setValue}
                      dropOptions={[
                          {label: "UK Students", value: "UK Students"},
                          {label: "EU Students", value: "EU Students"},
                          {label: "International Students", value: "International Students"},
                          {label: "Prefer not to say", value: null}
                      ]}
                      className={"registrationForm__dropdown"}
            />
            <FancyInput onSubmit={handleSubmit} label={"Password"} type={"password"} width={"auto"}
                        maxLength={30} {...inputStates.password}/>
            <FancyInput onSubmit={handleSubmit} label={"Confirm password"} type={"password"} width={"auto"}
                        maxLength={30} {...inputStates.confirmPassword}/>
            <FancyInput onSubmit={handleSubmit} type={"email"} label={"Email address"}
                        className={"registrationForm__email"} maxLength={40} value={email} disabled={true}/>
            <Button type={"primary"} height={42} label={"REGISTER"} className={"registrationForm__button"}
                    onClick={handleSubmit} status={loadingState}/>
        </div>
    )
}

function isEmpty(object) {
    return Object.keys(object).length === 0 && object.constructor === Object;
}