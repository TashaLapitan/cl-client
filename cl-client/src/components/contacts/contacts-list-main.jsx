import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Actions from './../../redux/actions/contacts-actions';
import {ContactInfo} from "./contact-info";
import {ContactForm} from "./contact-form";
import {ContactListContainer, MainContainer} from '../styled-components'
import {ContactSearch} from "./contact-search";

export const ContactsListMain = () => {

    const dispatch = useDispatch();
    const displayedContacts = useSelector(state => state.contacts.displayedContacts);

    useEffect(()=> {
        dispatch(Actions.getAllContacts());
    }, []);

    return <MainContainer>

        <ContactForm/>

        <ContactListContainer>
            <h3>Your contacts</h3>

            <ContactSearch/>

            {!!displayedContacts.length && displayedContacts.map(contact => <ContactInfo key={contact.id} contact={contact}/>)}
            {!displayedContacts.length && <div>No contacts..</div>}

        </ContactListContainer>

    </MainContainer>

};