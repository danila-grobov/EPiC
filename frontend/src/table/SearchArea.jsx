import React, {useState} from "react"
import "../scss/table/searchArea.scss"
import searchIcon from "../imgs/search.svg"
import SearchPhrase from "./SearchPhrase";
import Input from "../general_components/Input";

export default () => {
    const [filters, setFilters] = useState([]);
    const handleFilterDelete = index => {
        setFilters([
            ...filters.slice(0, index),
            ...filters.slice(index + 1)
        ]);
    }
    return (
        <div className="searchArea">
            <div className="searchInput">
                <img src={searchIcon} alt="search icon" className="searchInput__icon"/>
                <Input className={"searchInput__input"}
                       onSubmit={value => setFilters([...filters, value])} charLimit={80}/>
            </div>
            {
                filters.map((filter, index) =>
                    <SearchPhrase key={index} value={filter} index={index} onDelete={handleFilterDelete}/>)
            }
        </div>
    )
}