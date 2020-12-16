import React from "react"
import "./searchArea.scss"
import searchIcon from "./imgs/search.svg"
import removeIcon from "./imgs/remove.svg"
export default () => {
    return (
        <div className="searchArea">
            <div className="searchInput">
                <img src={searchIcon} alt="search icon" className="searchInput__icon"/>
                <input type="text" className="searchInput__input"/>
            </div>
            <div className="searchPhrase">
                <span className="searchPhrase__title">
                    William
                </span>
                <img src={removeIcon} alt="remove icon" className="searchPhrase__remove"/>
            </div>
        </div>
    )
}