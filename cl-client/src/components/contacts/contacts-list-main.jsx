import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Actions from './../../redux/actions/contacts-actions';
import {ContactInfo} from "./contact-info";
import {ContactForm} from "./contact-form";
import {ContactListContainer, MainContainer, SearchInput} from '../styled-components'

export const ContactsListMain = () => {

    const dispatch = useDispatch();

    const [contactToEdit, setContactToEdit] = useState(null);

    const displayedContacts = useSelector(state => state.contacts.displayedContacts);
    const searchValue = useSelector(state => state.contacts.searchValue);

    function handleSearch(value) {
        dispatch(Actions.filterContacts(value));
    };

    useEffect(()=> {
        dispatch(Actions.getAllContacts());
    }, []);

    return <MainContainer>

        <ContactForm contactToEdit={contactToEdit}
                     setContactToEdit={setContactToEdit}/>

        <ContactListContainer>
            <h3>Your contacts</h3>

            <SearchInput value={searchValue} onChange={e=>handleSearch(e.target.value)} placeholder="Search.."/>

            {displayedContacts.length > 0 && displayedContacts.map(contact => <ContactInfo key={contact.id} contact={contact}
                                                                                           setContactToEdit={setContactToEdit}/>)}

            {displayedContacts.length === 0 && <div>No contacts..</div>}

        </ContactListContainer>

    </MainContainer>

};