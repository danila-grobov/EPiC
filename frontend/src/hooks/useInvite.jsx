import React, {useState} from "react"
import SearchPhrase from "../table/SearchPhrase";
import axios from "axios_redirect";
import {toast} from "react-toastify";

export default (course, checkValidity, reset) => {
    const [invites, setInvites] = useState([]);
    const addInvite = invite => {
        if(checkValidity(invite)) {
            setInvites([...invites, invite]);
            reset();
        }
    }
    const deleteInvite = index => setInvites([...invites.slice(0, index), ...invites.slice(index + 1)]);
    const resetInvites = () => setInvites([]);
    const getInviteElements = () => invites.map((invite, index) =>
        <SearchPhrase index={index} key={index} value={invite} onDelete={deleteInvite}/>
    ).reverse();
    const sendInvites = setLoadState => {
        setLoadState("loading")
        axios.post('/api/t/students', {invites, course})
            .then(function ({data: errors}) {
                console.log(errors);
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
    return {
        invites,
        setInvites,
        addInvite,
        sendInvites,
        deleteInvite,
        resetInvites,
        getInviteElements
    }
}