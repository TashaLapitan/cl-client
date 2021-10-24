import React, {useState, useEffect} from 'react';
import {contactsService} from "../services/contacts-service";
import {ContactInfo} from "./contact-info";

export const ContactsListMain = () => {

    const [contacts, setContacts] = useState([]);

    async function getAllActiveContacts() {
        const allActiveContacts = await contactsService.getAllActiveContacts();
        setContacts(allActiveContacts);
    };

    useEffect(()=> {
        getAllActiveContacts();
    }, []);

    return <div>

            {contacts.map(contact => <ContactInfo key={contact.id} contact={contact}/>)}

    </div>

};