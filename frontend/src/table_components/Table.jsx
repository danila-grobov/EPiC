import React from "react"
import "../scss/table.scss"
import SearchArea from "./SearchArea";
import TableContent from "./TableContent";
import TableButtons from "./TableButtons";
import TableNavigation from "./TableNavigation";
export default () => {
    return (
        <div className="table">
            <SearchArea />
            <TableContent />
            <TableButtons />
            <TableNavigation />
        </div>
    )
}
