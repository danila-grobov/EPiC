import React, {useState} from "react"
import FancyInput from "../general_components/FancyInput";
import Button from "../general_components/Button";
import useValue from "../hooks/useValue";
import useValid from "../hooks/useValid";
import "../scss/login_page/loginPage.scss";
import "../scss/app.scss";
import axios from "axios_redirect";
import md5 from "md5";

export default () => {
    const inputStates = {
        userName: {...useValue(""), ...useValid("text")},
        password: {...useValue(""), ...useValid("text")},
    }
    const [loadingState, setLoadingState] = useState("idle");
    const handleLogin = () => {
        const inputsValid = Object.keys(inputStates).reduce((valid, inputType) => {
            const {value, checkValidity} = inputStates[inputType];
            return checkValidity(value) && valid;
        }, true);
        if (inputsValid) {
            setLoadingState("loading")
            axios
                .get("/api/login", {
                    params: {
                        username: inputStates.userName.value,
                        password: md5(inputStates.password.value)
                    }
                }).then(res => {
                    if(res) {
                        inputStates.userName.setErrorMessage("The username or password is incorrect.")
                        inputStates.password.setErrorMessage("The username or password is incorrect.")
                        setLoadingState("error")
                        setTimeout(() => setLoadingState("idle"),1000);
                    }
            })
        }
    }
    return (
        <div className="loginPage">
            <span className="loginPage__title">EPiC Login</span>
            <div className="loginPage__inputs">
                <FancyInput onSubmit={handleLogin} label={"Username"} {...inputStates.userName} />
                <FancyInput onSubmit={handleLogin} label={"Password"} type={"password"} {...inputStates.password} />
            </div>
            <Button type={"primary"} className={"loginPage__button"} label={"LOGIN"} height={42} onClick={handleLogin}
                    status={loadingState}
            />
        </div>
    )
}