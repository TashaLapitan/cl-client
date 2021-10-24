import React, {useState, useEffect} from 'react';
import {contactsService} from "../services/contacts-service";
import {Alert, Button} from 'react-bootstrap';
import {ContactInfo} from "./contact-info";
import {ContactForm} from "./contact-form";
import {ConfirmDeleteModal} from "./confirm-delete-modal";

export const ContactsListMain = () => {

    const [contacts, setContacts] = useState([]);
    const [contactToEdit, setContactToEdit] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);
    const [error, setError] = useState("");

    async function getAllActiveContacts() {
        const allActiveContacts = await contactsService.getAllActiveContacts();
        setContacts(allActiveContacts);
    };

    useEffect(()=> {
        getAllActiveContacts();
    }, []);

    return <div>
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

            <div>
                <h3>Your contacts</h3>
                {contacts.map(contact => <ContactInfo key={contact.id} contact={contact}
                                                      setContactToEdit={setContactToEdit}
                                                      setContactToDelete={setContactToDelete}/>)}
            </div>
        </div>
};