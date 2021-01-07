import React, {useState} from "react"
import "../scss/table/invitePopup.scss"
import remove_dark from "../imgs/remove__dark.svg"
import Button from "../general_components/Button";
import FileInput from "../general_components/FileInput";
import ScrollableContainer from "../general_components/ScrollableContainer";
import FancyInput from "../general_components/FancyInput";
import useValid from "../hooks/useValid";
import useInvite from "../hooks/useInvite";
import useValue from "../hooks/useValue";

export default props => {
    const {closePopup, course} = props;
    const {errorMessage, checkValidity} = useValid("email");
    const [loadState, setLoadState] = useState("idle");
    const {reset:resetEmail,value:email,setValue:setEmail} = useValue("");
    const {invites, sendInvites, setInvites, addInvite, getInviteElements} =
        useInvite(course, checkValidity, resetEmail);
    return (
        <div className="invitePopup__wrapper">
            <div className="invitePopup__background" onClick={closePopup}/>
            <div className="invitePopup">
                <div className="invitePopup__header">
                    <span className="invitePopup__title">Invite new students to the system</span>
                    <img src={remove_dark} alt="remove icon" onClick={closePopup} className="invitePopup__closeIcon"/>
                </div>
                <div className="invitePopup__content">
                    <FancyInput label={"Email"} className={"invitePopup__input"} errorMessage={errorMessage}
                                type={"email"} onSubmit={addInvite} charLimit={30} autoWidth={true}
                                value={email} setValue={setEmail}
                    />
                    <FileInput setFileData={setInvites}
                               successMessage={"The emails have been successfully uploaded."}
                               button={<Button height={32} className={"invitePopup__importButton"}
                                               label={"Import from JSON"} type={"secondary"}/>}
                               type={"emails"}
                    />
                    <ScrollableContainer className="invitePopup__inviteList">
                        {
                            invites.length !== 0 ? getInviteElements() :
                                <span className="invitePopup__emptyList">{"No students in the invite list."}</span>
                        }
                    </ScrollableContainer>
                    <Button height={38} width={133} className={"invitePopup__inviteButton"} label={"Invite students"}
                            type={"primary"} onClick={() => sendInvites(setLoadState)} status={loadState}/>
                </div>
            </div>
        </div>
    )
}