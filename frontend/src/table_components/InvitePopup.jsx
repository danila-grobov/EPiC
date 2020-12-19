import React from "react"
import "../scss/invitePopup.scss"
import remove_dark from "../imgs/remove__dark.svg"
import Input from "./Input";
import Button from "./Button";
export default () => {
    return (
        <div className="invitePopup__background">
            <div className="invitePopup">
                <div className="invitePopup__header">
                    <span className="invitePopup__title">Invite new students to the system</span>
                    <img src={remove_dark} alt="remove icon" className="invitePopup__closeIcon"/>
                </div>
                <div className="invitePopup__content">
                    <Input width={298} label={"Email"} className={"invitePopup__input"} />
                    <Button height={46} className={"invitePopup__addButton"} label={"Add to invite list"} type={"secondary"} />
                    <Button height={38} className={"invitePopup__importButton"} label={"Import from CSV"} type={"secondary"} />
                </div>
            </div>
        </div>
    )
}