import React,{useState} from "react"
import "../scss/invitePopup.scss"
import remove_dark from "../imgs/remove__dark.svg"
import Input from "./Input";
import Button from "./Button";
import SearchPhrase from "./SearchPhrase";
import useInput from "../hooks/useInput";
export default props => {
    const {closePopup} = props;
    const [invites, setInvites] = useState([]);
    const addInvite = invite => setInvites([...invites,invite]);
    const deleteInvite = index => setInvites([...invites.slice(0,index),...invites.slice(index+1)]);
    const getInviteElements = () => invites.map((invite,index) =>
            <SearchPhrase index={index} key={index} value={invite} onDelete={deleteInvite} />
        ).reverse();
    const {bind,value} = useInput("",30);
    return (
        <div className="invitePopup__wrapper">
            <div className="invitePopup__background" onClick={closePopup}/>
            <div className="invitePopup">
                <div className="invitePopup__header">
                    <span className="invitePopup__title">Invite new students to the system</span>
                    <img src={remove_dark} alt="remove icon" onClick={closePopup} className="invitePopup__closeIcon"/>
                </div>
                <div className="invitePopup__content">
                    <Input width={298} label={"Email"} className={"invitePopup__input"} {...bind} />
                    <Button height={46} className={"invitePopup__addButton"} label={"Add to invite list"}
                            type={"secondary"} onClick={() => {addInvite(value)}} />
                    <Button height={38} className={"invitePopup__importButton"} label={"Import from CSV"} type={"secondary"} />
                    <div className="invitePopup__inviteList">
                        {invites.length !== 0 ? getInviteElements() :
                            <span className="invitePopup__emptyList">{"No students in the invite list."}</span>}
                    </div>
                    <Button height={38} className={"invitePopup__inviteButton"} label={"Invite students"} type={"primary"} />
                </div>
            </div>
        </div>
    )
}