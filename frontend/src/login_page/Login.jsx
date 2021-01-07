import React from "react"
import FancyInput from "../general_components/FancyInput";
import Button from "../general_components/Button";
import useValue from "../hooks/useValue";
import useValid from "../hooks/useValid";
import "../scss/login_page/loginPage.scss";
import "../scss/app.scss";
export default () => {
    const inputStates = {
        userName: {...useValue(""), ...useValid("text")},
        password: {...useValue(""), ...useValid("text")},
    }
    return (
        <div className="loginPage">
            <span className="loginPage__title">EPiC Login</span>
            <div className="loginPage__inputs">
                <FancyInput label={"Username"} {...inputStates.userName} />
                <FancyInput label={"Password"} type={"password"} {...inputStates.password} />
            </div>
            <Button type={"primary"} className={"loginPage__button"} label={"LOGIN"} height={42} />
        </div>
    )
}