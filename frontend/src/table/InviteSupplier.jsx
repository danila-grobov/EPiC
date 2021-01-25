import React, {useRef} from "react"
import FancyInput from "../general_components/TextInput/FancyInput";
import FileInput from "../general_components/FileInput";
import Button from "../general_components/Button";
import useValid from "../hooks/useValid";
import useValue from "../hooks/useValue";

//Responsible for adding invites to the invite list.
export default props => {
    const {invites, setInvites} = props;
    const {errorMessage, checkValidity} = useValid("email");
    const emailInput = useRef(null);
    const {reset:resetEmail,value:email,setValue:setEmail} = useValue("");
    const addInvite = invite => {
        if(checkValidity(invite)) {
            setInvites([...invites, invite]);
            resetEmail();
            emailInput.current.focus();
        }
    }
    return <>
        <FancyInput label={"Email"} className={"invitePopup__input"} errorMessage={errorMessage}
                    type={"email"} onSubmit={addInvite} maxLength={30} autoWidth={true}
                    value={email} setValue={setEmail} inputRef={emailInput}
        />
        <div className="invitePopup__addButton" onClick={() => addInvite(email)}>ADD</div>
        <FileInput setFileData={setInvites}
                   successMessage={"The emails have been successfully uploaded."}
                   button={<Button height={32} className={"invitePopup__importButton"}
                                   label={"Import from JSON"} type={"secondary"}/>}
                   type={"emails"}
        />
    </>
}