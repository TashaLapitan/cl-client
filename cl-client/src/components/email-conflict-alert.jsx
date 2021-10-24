import React from 'react';
import {Alert, Button} from "react-bootstrap";
import {contactsService} from "../services/contacts-service";

export const EmailConflictAlert = (props) => {
    const {reason, message, contact_id} = props.conflictError;

    async function restoreContact() {
        const restoredContact = await contactsService.restoreContact(contact_id);
        if (restoredContact.error) {
            props.setHasConflict(false);
            props.setError(restoredContact);
            return
        }
        props.setContacts([...props.contacts, restoredContact]);
        props.setHasConflict(false);
        props.clearForm();
    };

    function renderButtons() {
            return <div>
                <Button onClick={()=> props.setHasConflict(false)}>Close</Button>
                {reason === 'inactive' && <Button onClick={()=>restoreContact()}>Restore</Button>}
                {reason === 'inactive' && <Button onClick={()=>props.overwriteContact(contact_id)}>Overwrite</Button>}
            </div>

    };

    return <Alert>
                <Alert.Heading>Email conflict</Alert.Heading>
                <p>{message}</p>
                {renderButtons()}
            </Alert>
};