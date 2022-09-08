import React from "react";
import NavBar from "../NavBar";
import SearchBar from "./SearchBar";
import './Search.css'

const Search = () => {
    

    return (
        <div className="homepage-container">
            <NavBar />
            <div className="homepage-right search">
                <div className="search-page-container">

                <h1>Search Page</h1>
                <SearchBar />
                </div>
            </div>
        </div>
    )
}

export default Search