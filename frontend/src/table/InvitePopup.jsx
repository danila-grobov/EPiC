import React, {useState} from "react"
import "../scss/table/invitePopup.scss"
import remove_dark from "../imgs/remove__dark.svg"
import Button from "../general_components/Button";
import SearchPhrase from "./SearchPhrase";
import FileInput from "../general_components/FileInput";
import ScrollableContainer from "../general_components/ScrollableContainer";
import FancyInput from "../general_components/FancyInput";
import axios from "axios";

export default props => {
    const {closePopup, course} = props;
    const [invites, setInvites] = useState([]);
    const addInvite = invite => setInvites([...invites, invite]);
    const deleteInvite = index => setInvites([...invites.slice(0, index), ...invites.slice(index + 1)]);
    const getInviteElements = () => invites.map((invite, index) =>
        <SearchPhrase index={index} key={index} value={invite} onDelete={deleteInvite}/>
    ).reverse();
    const [loadState, setLoadState] = useState("idle");
    const sendInvites = () => {
        setLoadState("loading")
        axios.post('/api/students', {invites,course})
            .then(function (response) {
                setTimeout(() => setLoadState("done"), 500);
                setTimeout(() => setLoadState("idle"), 1500);
            })
            .catch(function (error) {
                console.log(error);
            });
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
                    <FancyInput label={"Email"} className={"invitePopup__input"}
                                type={"email"} onSubmit={addInvite} charLimit={30}/>
                    <FileInput setFileData={setInvites}
                               successMessage={"The emails have been successfully uploaded."}
                               button={<Button height={38} className={"invitePopup__importButton"}
                                               label={"Import from JSON"} type={"secondary"}/>}
                               type={"emails"}
                    />
                    <ScrollableContainer className="invitePopup__inviteList">
                        {invites.length !== 0 ? getInviteElements() :
                            <span className="invitePopup__emptyList">{"No students in the invite list."}</span>}
                    </ScrollableContainer>
                    <Button height={38} width={133} className={"invitePopup__inviteButton"} label={"Invite students"}
                            type={"primary"} onClick={sendInvites} status={loadState}/>
                </div>
            </div>
        </div>
    )
}