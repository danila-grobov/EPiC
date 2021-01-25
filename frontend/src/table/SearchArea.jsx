import React from "react"
import "../scss/table/searchArea.scss"
import searchIcon from "../imgs/search.svg"
import SearchPhrase from "./SearchPhrase";
import Input from "../general_components/TextInput/Input";

export default ({filters, setFilters}) => {
    const handleFilterDelete = index => {
        setFilters([
            ...filters.slice(0, index),
            ...filters.slice(index + 1)
        ]);
    }
    return (
        <div className="searchArea" role={"list"}>
            <div className="searchInput" role={"search"}>
                <img src={searchIcon} alt="search icon" className="searchInput__icon"/>
                <Input className={"searchInput__input"} width={"auto"}
                       onSubmit={value => setFilters([...filters, value])} maxLength={80}/>
            </div>
            {
                filters.map((filter, index) =>
                    <SearchPhrase key={index} value={formatFilter(filter)} index={index}
                                  onDelete={handleFilterDelete}/>)
            }
        </div>
    )
}

function formatFilter(filter) {
    const filterSplit = filter.split(" || ");
    const finalFilter = [];
    filterSplit.map((filter, index) => {
        finalFilter.push(filter);
        if (index !== filterSplit.length - 1)
            finalFilter.push(<span key={"or--" + index} className="searchPhrase__or">{"or"}</span>);
    })
    return finalFilter
}
