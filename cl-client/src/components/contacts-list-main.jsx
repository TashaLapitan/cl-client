import React, {useState, useEffect} from 'react';
import {contactsService} from "../services/contacts-service";
import {ContactInfo} from "./contact-info";
import {ContactForm} from "./contact-form";

export const ContactsListMain = () => {

    const [contacts, setContacts] = useState([]);
    const [contactToEdit, setContactToEdit] = useState(null);

    async function getAllActiveContacts() {
        const allActiveContacts = await contactsService.getAllActiveContacts();
        setContacts(allActiveContacts);
    };

    useEffect(()=> {
        getAllActiveContacts();
    }, []);

    return <div>
            <ContactForm setContacts={setContacts}
                         contacts={contacts}
                         contactToEdit={contactToEdit}
                         setContactToEdit={setContactToEdit}/>

            {contacts.map(contact => <ContactInfo key={contact.id} contact={contact}
                                                  setContactToEdit={setContactToEdit}/>)}

    </div>

};