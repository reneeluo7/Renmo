import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserFullName, getUserInitials } from "../../util/nameconvert";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const loggedInUser = useSelector((state) => state.session.user);
  const [inputStr, setInputStr] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [users, setUsers] = useState([]);

  const noLogInUsers = users.filter((user) => user.id !== loggedInUser.id);

  const filteredUsers = (inputStr) => {
    const list = [];
    for (let user of noLogInUsers) {
      if (
        getUserFullName(user).toLowerCase().includes(inputStr) ||
        user.username.toLowerCase().includes(inputStr)
      ) {
        list.push(user);
      }
    }
    return list;
  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (inputStr.length) {
      setShowMenu(true);
      setSearchResult(filteredUsers(inputStr));
    } else {
      setShowMenu(false);
      setSearchResult([]);
    }
  }, [inputStr]);

  return (
    <div className="user-search-input">
      <div className="searchBar-input-wrap">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          className="user-search"
          placeholder="Name or username"
          onChange={(e) => setInputStr(e.target.value.toLowerCase())}
          value={inputStr}
        />
      </div>
        {!showMenu && <div className="search-explain">* Only users registered with Renmo can be searched</div>}
      {showMenu && searchResult.length > 0 && (
        <div className="search-bar-drop-down">
          {searchResult.map((user, index) => (
            <Link
              key={index}
              onClick={() => setInputStr("")}
              to={{ pathname: `/u/${user.username}`, state: { user } }}
              className="search-dropdown-item"
            >
              <div className="search-dropdown-user-info">
                <div className="txn-bar-initial">{getUserInitials(user)}</div>
                <div className="txn-bar-info">
                  <p className="topline">{getUserFullName(user)}</p>
                  <p className="secondline">@{user.username}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {showMenu && !searchResult.length && (
        <div  className="search-bar-drop-down">
          <div className="no-user-found">
          No User Found
          </div>
          </div>
      )}
    </div>
  );
};

export default SearchBar;
