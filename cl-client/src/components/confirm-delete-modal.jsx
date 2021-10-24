import React from 'react';
import {Button, Modal} from 'react-bootstrap'
import {contactsService} from "../services/contacts-service";

export const ConfirmDeleteModal = (props) => {

    async function confirmSoftDelete() {
        const isDeleted = await contactsService.softDeleteContact(props.contactToDelete.id);
        if (isDeleted.success) {
            props.setContactToDelete(null);
            props.setContacts(props.contacts.filter(c=> c.id !== props.contactToDelete.id));
            return
        }
    };

    return <Modal.Dialog>
            <Modal.Header><Modal.Title>Confirm action</Modal.Title></Modal.Header>
            <Modal.Body>Are you sure you want to delete <strong>{props.contactToDelete.email}</strong> from your contacts?</Modal.Body>
            <Modal.Footer>
                <Button onClick={()=>props.setContactToDelete(null)}>Cancel</Button>
                <Button onClick={()=>confirmSoftDelete()}>Confirm</Button>
            </Modal.Footer>
        </Modal.Dialog>
};