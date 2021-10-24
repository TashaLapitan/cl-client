import React, {useState, useEffect} from 'react';
import {contactsService} from "../services/contacts-service";
import {Alert, Button} from 'react-bootstrap';
import {ContactInfo} from "./contact-info";
import {ContactForm} from "./contact-form";
import {ConfirmDeleteModal} from "./confirm-delete-modal";
import {ContactListContainer, MainContainer, SearchInput} from './styled-components'

export const ContactsListMain = () => {

    const [contacts, setContacts] = useState([]);
    const [displayedContacts, setDisplayedContacts] = useState([]);
    const [contactToEdit, setContactToEdit] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [error, setError] = useState("");
    const [searchValue, setSearchValue] = useState("");

    async function getAllActiveContacts() {
        const allActiveContacts = await contactsService.getAllActiveContacts();
        setContacts(allActiveContacts);
        setDisplayedContacts(allActiveContacts);
    };

    function handleSearch(value) {
        setSearchValue(value);
        value = value.toLowerCase();

        if (value === "") {
            setDisplayedContacts(contacts);
            return
        }
        const matchingContacts = contacts.filter(c => {
            if (c.first_name.toLowerCase().includes(value)) return true;
            if (c.last_name.toLowerCase().includes(value)) return true;
            if (c.email.toLowerCase().includes(value)) return true;
            if (c.phone_number.toLowerCase().includes(value)) return true;
            if (c.comment && c.comment.toLowerCase().includes(value)) return true;
            return false;
        });

        setDisplayedContacts(matchingContacts);
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
                                                setDisplayedContacts={setDisplayedContacts}
                                                setError={setError}/>}

        <ContactForm setContacts={setContacts}
                     setDisplayedContacts={setDisplayedContacts}
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