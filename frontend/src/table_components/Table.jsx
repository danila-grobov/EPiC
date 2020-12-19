import React from "react"
import "../scss/table.scss"
import SearchArea from "./SearchArea";
import TableContent from "./TableContent";
import TableButtons from "./TableButtons";
import TableNavigation from "./TableNavigation";
import InvitePopup from "./InvitePopup";
export default () => {
    return (
        <div className="table">
            <InvitePopup />
            <SearchArea />
            <TableContent />
            <TableButtons />
            <TableNavigation />
        </div>
    )
}
