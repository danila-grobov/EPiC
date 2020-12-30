import React, {useState} from "react"
import "../scss/table/table.scss"
import SearchArea from "./SearchArea";
import TableContent from "./TableContent";
import TableButtons from "./TableButtons";
import TableNavigation from "./TableNavigation";
import InvitePopup from "./InvitePopup";
export default () => {
    const [popupState, setPopupState] = useState(false);
    return (
        <div className="table">
            {popupState ? <InvitePopup closePopup={() => setPopupState(false)}/> : ""}
            <SearchArea/>
            <TableContent/>
            <TableButtons openPopup={() => setPopupState(true)}/>
            <TableNavigation/>
        </div>
    )
}
