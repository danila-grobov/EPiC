import React, {useState, useRef} from "react"
import "../scss/table/invitePopup.scss"
import remove_dark from "../imgs/remove__dark.svg"
import Button from "../general_components/Button";
import SearchPhrase from "./SearchPhrase";
import FileInput from "../general_components/FileInput";
import ScrollableContainer from "../general_components/ScrollableContainer";
import FancyInput, {inputTypes} from "../general_components/FancyInput";
import axios from "axios";
import {toast} from "react-toastify";
import useValid from "../hooks/useValid";

export default props => {
    const {closePopup, course} = props;
    const [invites, setInvites] = useState([]);
    const {valid, updateValid} = useValid(inputTypes["email"].regEx, 30);
    const addInvite = invite => {
        const errorIndex = updateValid(invite);
        if( errorIndex === -1)
            setInvites([...invites, invite]);
        return errorIndex;
    }
    const deleteInvite = index => setInvites([...invites.slice(0, index), ...invites.slice(index + 1)]);
    const resetInvites = () => setInvites([]);
    const getInviteElements = () => invites.map((invite, index) =>
        <SearchPhrase index={index} key={index} value={invite} onDelete={deleteInvite}/>
    ).reverse();
    const [loadState, setLoadState] = useState("idle");
    const sendInvites = () => {
        setLoadState("loading")
        axios.post('/api/students', {invites, course})
            .then(function ({data: errors}) {
                setTimeout(() => {
                    if (errors.length === 0) {
                        setLoadState("done");
                        resetInvites();
                    } else {
                        errors.map(error => toast.error(error));
                        setLoadState("error");
                    }
                }, 500);
                setTimeout(() => setLoadState("idle"), 1500);
            })
    }
    return (
        <div className="invitePopup__wrapper">
            <div className="invitePopup__background" onClick={closePopup}/>
            <div className="invitePopup">
                <div className="invitePopup__header">
                    <span className="invitePopup__title">Invite new students to the system</span>
                    <img src={remove_dark} alt="remove icon" onClick={closePopup} className="invitePopup__closeIcon"/>
                </div>
                <div className="invitePopup__content">
                    <FancyInput label={"Email"} className={"invitePopup__input"} valid={valid}
                                type={"email"} onSubmit={addInvite} charLimit={30} autoWidth={true}/>
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
                            type={"primary"} onClick={sendInvites} status={loadState}/>
                </div>
            </div>
        </div>
    )
}