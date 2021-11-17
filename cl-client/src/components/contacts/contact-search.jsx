import React from 'react';
import {SearchInput} from "../styled-components";
import {useSelector, useDispatch} from "react-redux";
import Actions from "../../redux/actions/contacts-actions";

export const ContactSearch = () => {

    const searchValue = useSelector(state => state.contacts.searchValue);
    const dispatch = useDispatch();
    
    function handleSearch(value) {
        dispatch(Actions.filterContacts(value));
    };

    return <SearchInput value={searchValue}
                        onChange={e=>handleSearch(e.target.value)}
                        placeholder="Search.."/>
};

