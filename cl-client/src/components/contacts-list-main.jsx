import React, {useState, useEffect} from 'react';
import {contactsService} from "../services/contacts-service";
import {ContactInfo} from "./contact-info";
import {ContactForm} from "./contact-form";
import {ConfirmDeleteModal} from "./confirm-delete-modal";

export const ContactsListMain = () => {

    const [contacts, setContacts] = useState([]);
    const [contactToEdit, setContactToEdit] = useState(null);
    const [contactToDelete, setContactToDelete] = useState(null);

    async function getAllActiveContacts() {
        const allActiveContacts = await contactsService.getAllActiveContacts();
        setContacts(allActiveContacts);
    };

    useEffect(()=> {
        getAllActiveContacts();
    }, []);

    return <div>

            {contactToDelete && <ConfirmDeleteModal contactToDelete={contactToDelete}
                                                    setContactToDelete={setContactToDelete}
                                                    contacts={contacts}
                                                    setContacts={setContacts}/>}
            <ContactForm setContacts={setContacts}
                         contacts={contacts}
                         contactToEdit={contactToEdit}
                         setContactToEdit={setContactToEdit}/>

            {contacts.map(contact => <ContactInfo key={contact.id} contact={contact}
                                                  setContactToEdit={setContactToEdit}
                                                  setContactToDelete={setContactToDelete}/>)}

    </div>

};