/**
 * @author Danila Grobov
 */
import React, {useState} from "react";
import "../scss/table/invitePopup.scss";
import remove_dark from "../imgs/remove__dark.svg";
import Button from "../general_components/Button";
import ScrollableContainer from "../general_components/ScrollableContainer";
import useInvite from "../hooks/useInvite";
import InviteSupplier from "./InviteSupplier";

/**
 * Displays a popup, for inviting the students into the system.
 */
export default props => {
    const {closePopup, course} = props;
    const [loadState, setLoadState] = useState("idle");
    const {invites, sendInvites, setInvites, getInviteElements} = useInvite(course);
    return (
        <div role="dialog" className="invitePopup__wrapper" data-testid={"invitePopup"}>
            <div className="invitePopup__background" onClick={closePopup} aria-label={"Close dialog"}/>
            <div className="invitePopup">
                <div className="invitePopup__header">
                    <span className="invitePopup__title">Invite new students to the system</span>
                    <img src={remove_dark} alt="remove icon" onClick={closePopup} className="invitePopup__closeIcon"/>
                </div>
                <div className="invitePopup__content">
                    <InviteSupplier setInvites={setInvites} invites={invites}/>
                    <ScrollableContainer className="invitePopup__inviteList">
                    {
                        invites.length !== 0
                        ? getInviteElements()
                        : <span className="invitePopup__emptyList">{"No students in the invite list."}</span>
                    }
                    </ScrollableContainer>
                    <Button height={38} width={133} className={"invitePopup__inviteButton"} label={"Invite students"}
                            type={"primary"} onClick={() => sendInvites(setLoadState)} status={loadState}/>
                </div>
            </div>
        </div>
    );
};