import React from 'react';
import {Alert, Button} from "react-bootstrap";
import {contactsService} from "../../services/contacts-service";
import {ConflictBtnWrapper} from "../styled-components";

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
        return <ConflictBtnWrapper>
            <Button variant="outline-secondary" onClick={()=> props.setHasConflict(false)}>Close</Button>
            {reason === 'inactive' && <Button variant="outline-success" onClick={()=>restoreContact()}>Restore</Button>}
            {reason === 'inactive' && <Button variant="outline-danger" onClick={()=>props.overwriteContact(contact_id)}>Overwrite</Button>}
        </ConflictBtnWrapper>

    };

    return <Alert variant='warning'>
        <Alert.Heading>Email conflict</Alert.Heading>
        <p>{message}</p>
        {renderButtons()}
    </Alert>
};