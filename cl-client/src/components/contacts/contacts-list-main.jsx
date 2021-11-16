import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import Actions from './../../redux/actions/contacts-actions';
import {Alert, Button} from 'react-bootstrap';
import {ContactInfo} from "./contact-info";
import {ContactForm} from "./contact-form";
import {ConfirmDeleteModal} from "./confirm-delete-modal";
import {ContactListContainer, MainContainer, SearchInput} from '../styled-components'

export const ContactsListMain = () => {

    const dispatch = useDispatch();

    const [contacts, setContacts] = useState([]);
    const [contactToEdit, setContactToEdit] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [error, setError] = useState("");

    const displayedContacts = useSelector(state => state.contacts.displayedContacts);
    const searchValue = useSelector(state => state.contacts.searchValue);

    function handleSearch(value) {
        dispatch(Actions.filterContacts(value));
    };

    useEffect(()=> {
        dispatch(Actions.getAllContacts());
    }, []);

    return <MainContainer>

        {error && <Alert>
            <p>{error}</p>
            <Button onClick={()=>setError("")}>Ok!</Button>
        </Alert>}

        {contactToDelete && <ConfirmDeleteModal contactToDelete={contactToDelete}
                                                setContactToDelete={setContactToDelete}
                                                contacts={contacts}
                                                setContacts={setContacts}
                                                setError={setError}/>}

        <ContactForm setContacts={setContacts}
                     contacts={contacts}
                     contactToEdit={contactToEdit}
                     setContactToEdit={setContactToEdit}
                     setError={setError}/>

        <ContactListContainer>
            <h3>Your contacts</h3>

            <SearchInput value={searchValue} onChange={e=>handleSearch(e.target.value)} placeholder="Search.."/>

            {displayedContacts.length > 0 && displayedContacts.map(contact => <ContactInfo key={contact.id} contact={contact}
                                                                                           setContactToEdit={setContactToEdit}
                                                                                           setContactToDelete={setContactToDelete}/>)}

            {displayedContacts.length === 0 && <div>No contacts..</div>}

        </ContactListContainer>

    </MainContainer>

};