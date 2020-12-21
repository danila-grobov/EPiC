import React, {useState, useRef} from "react"
import "../scss/invitePopup.scss"
import remove_dark from "../imgs/remove__dark.svg"
import Input from "./Input";
import Button from "./Button";
import SearchPhrase from "./SearchPhrase";
import useInput from "../hooks/useInput";
import FileInput from "./FileInput";

export default props => {
    const {closePopup} = props;
    const [invites, setInvites] = useState([]);
    const addInvite = invite => setInvites([...invites, invite]);
    const deleteInvite = index => setInvites([...invites.slice(0, index), ...invites.slice(index + 1)]);
    const getInviteElements = () => invites.map((invite, index) =>
        <SearchPhrase index={index} key={index} value={invite} onDelete={deleteInvite}/>
    ).reverse();
    const validationRegEx = /^([a-zA-Z0-9_\-\.]+)@(ncl|newcastle).ac.uk$/;
    const {bind, value, updateValid, valid} = useInput("", 30, validationRegEx);
    const fileInput = useRef(null);
    return (
        <div className="invitePopup__wrapper">
            <div className="invitePopup__background" onClick={closePopup}/>
            <div className="invitePopup">
                <div className="invitePopup__header">
                    <span className="invitePopup__title">Invite new students to the system</span>
                    <img src={remove_dark} alt="remove icon" onClick={closePopup} className="invitePopup__closeIcon"/>
                </div>
                <div className="invitePopup__content">
                    <Input width={298} label={"Email"} className={"invitePopup__input"} {...bind}
                           error={"Please enter a valid newcastle university email address."}
                    />
                    <Button height={46} className={"invitePopup__addButton"} label={"Add to invite list"}
                            type={"secondary"} onClick={() => {
                                if (updateValid() === 1) addInvite(value)
                            }}
                    />
                    <Button height={38} className={"invitePopup__importButton"} label={"Import from JSON"}
                            type={"secondary"} onClick={() => fileInput.current.click()}/>
                    <FileInput inputRef={fileInput} setFileData={setInvites}
                               successMessage={"The emails have been successfully uploaded."}
                               dataIsValid={data =>
                                   data.reduce((valid, element) => {
                                       return typeof element === "string" && element.match(validationRegEx) && valid
                                   }, true)
                               }/>*
                    <div className="invitePopup__inviteList">
                        {invites.length !== 0 ? getInviteElements() :
                            <span className="invitePopup__emptyList">{"No students in the invite list."}</span>
                        }
                    </div>
                    <Button height={38} className={"invitePopup__inviteButton"} label={"Invite students"}
                            type={"primary"}/>
                </div>
            </div>
        </div>
    )
}