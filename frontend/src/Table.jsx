import React from "react"
import "./scss/table.scss"
import SearchArea from "./SearchArea";
import TableContent from "./TableContent";
export default () => {
    return (
        <div className="table">
            <SearchArea />
            <TableContent />
        </div>
    )
}
