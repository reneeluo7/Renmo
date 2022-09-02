import React from "react";
import NavBar from "../NavBar";
import SearchBar from "./SearchBar";

const Search = () => {
    

    return (
        <div className="homepage-container">
            <NavBar />
            <div className="homepage-right search">
                <h1>Search Page</h1>
                <SearchBar />
            </div>
        </div>
    )
}

export default Search