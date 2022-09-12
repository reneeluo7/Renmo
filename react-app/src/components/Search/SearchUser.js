import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFullName, getUserInitials } from "../../util/nameconvert";
import { setSelectedUser } from "../../store/session";

const SearchUser = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.session.user);
  const [inputStr, setInputStr] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState();

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

  const handleClear = () => {
    setSelected();
    setInputStr("");
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

  useEffect(async () => {
    await dispatch(setSelectedUser(selected));
  }, [selected]);

  return (
    <div className="user-search-input-payform">
      <div className="user-search-input-payform-form">
        {!selected && (
          <input
            type="text"
            className="user-search-payform"
            placeholder="Search name or username"
            onChange={(e) => setInputStr(e.target.value.toLowerCase())}
            value={inputStr}
          />
        )}
        {selected && (
          <div className="show-selected-user">
            <span>{getUserFullName(selected)}</span>{" "}
            <button className="clear-selected-user" onClick={handleClear}>
              x
            </button>
          </div>
        )}
      </div>
      {showMenu && searchResult.length > 0 && (
        <div className="search-bar-drop-down-payform">
          {searchResult.map((user, index) => (
            <div
              className="search-dropdown-item payform"
              key={index}
              onClick={(e) => {
                e.preventDefault();
                setSelected(user);
                setShowMenu(false);
              }}
            >
              <div className="search-dropdown-user-info">
                <div className="txn-bar-initial">{getUserInitials(user)}</div>
                <div className="txn-bar-info">
                  <p className="topline">{getUserFullName(user)}</p>
                  <p className="secondline">@{user.username}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchUser;
