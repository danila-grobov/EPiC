import React, {useState} from "react"
import "../scss/searchArea.scss"
import searchIcon from "../imgs/search.svg"
import SearchPhrase from "./SearchPhrase";
import useInput from "../hooks/useInput";

export default () => {
    const [filters, setFilters] = useState([]);
    const {bind, value, reset} = useInput("", 80);
    const handleSubmit = e => {
        e.preventDefault();
        if (value !== "") {
            setFilters([...filters, value]);
            reset();
        }
    }
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
                <form onSubmit={handleSubmit} action={""}>
                    <input {...bind} type="text" className="searchInput__input"/>
                </form>
            </div>
            {
                filters.map((filter, index) =>
                    <SearchPhrase key={index} value={filter} index={index} onDelete={handleFilterDelete}/>)
            }
        </div>
    )
}