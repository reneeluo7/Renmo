import { useEffect, useState } from 'react';
import { getAllUsers } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import {getUserFullName} from '../../util/nameconvert'

const SearchBar = (loggedInUser) => {
    // const dispatch = useDispatch();
    const allusers = useSelector(state => state.session)

    const [searchTerm, setSearchTerm] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const [searchResult, setSearchResult] = useState([]);


    // useEffect(() => {
    //     dispatch(getAllUsers());
    //   }, [dispatch]);

    return (
        <input type="text" />
    )
}

export default SearchBar