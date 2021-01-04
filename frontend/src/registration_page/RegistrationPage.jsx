import React from "react"
import RegistrationForm from "./RegistrationForm";
import "../scss/registration_page/registrationPage.scss";
export default () => {
    return (
        <div className="registrationPage">
            <span className="registrationPage__welcomeMessage">Welcome Student!</span>
            <RegistrationForm />
            <div className="registrationPage__description">
                <span className="registrationPage__logo">
                    EPiC
                    <span className="registrationPage__logo--secondary">
                        Learning and Engagement
                    </span>
                </span>
                <span className="registrationPage__descriptionText">
                    Welcome to EPiC's learning and engagement tool! EPiC, stands for
                    "<b>Educational Practice in Computing</b>".
                    EPiC is a research group within the School of Computing that focus on improving the experience
                    for students and finding innovative teaching methods to aid learning.
                    The group is one of the biggest in the country that focuses on computer education research and they
                    are well known internationally.
                    This tool is designed to track student <b>progress</b> and <b>confidence</b> in each course and
                    will help contribute to EPiC's research in student <b>learning</b> and <b>engagement</b>.
                </span>
            </div>
        </div>
    )
}