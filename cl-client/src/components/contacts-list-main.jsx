import React, {useState, useEffect} from 'react';
import {contactsService} from "../services/contacts-service";
import {Alert, Button, Form} from 'react-bootstrap';
import {ContactInfo} from "./contact-info";
import {ContactForm} from "./contact-form";
import {ConfirmDeleteModal} from "./confirm-delete-modal";
import {ContactListContainer, MainContainer} from './styled-components'

export const ContactsListMain = () => {

    const [contacts, setContacts] = useState([]);
    const [contactToEdit, setContactToEdit] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [error, setError] = useState("");
    const [searchValue, setSearchValue] = useState("");

    async function getAllActiveContacts() {
        const allActiveContacts = await contactsService.getAllActiveContacts();
        setContacts(allActiveContacts);
    };

    function handleSearch() {

    };

    useEffect(()=> {
        getAllActiveContacts();
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
            <h3 style={{marginBottom: '38px'}}>Your contacts</h3>

            {contacts.length > 0 && contacts.map(contact => <ContactInfo key={contact.id} contact={contact}
                                                  setContactToEdit={setContactToEdit}
                                                  setContactToDelete={setContactToDelete}/>)}

            {contacts.length === 0 && <div>Your contact list is empty..</div>}

        </ContactListContainer>

    </MainContainer>

};