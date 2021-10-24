import React from 'react';
import {Button, Modal} from 'react-bootstrap'
import {contactsService} from "../services/contacts-service";
import {DeleteConfirmationModal} from "./styled-components";

export const ConfirmDeleteModal = (props) => {

    async function confirmSoftDelete() {
        const isDeleted = await contactsService.softDeleteContact(props.contactToDelete.id);
        if (isDeleted.success) {
            props.setContactToDelete(null);
            props.setContacts(props.contacts.filter(c=> c.id !== props.contactToDelete.id));
            return
        }
        if (isDeleted.error) props.setError(isDeleted.error)
    };

    return <DeleteConfirmationModal>
            <Modal.Header><Modal.Title>Confirm action</Modal.Title></Modal.Header>
            <Modal.Body>Are you sure you want to delete <strong>{props.contactToDelete.email}</strong> from your contacts?</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={()=>props.setContactToDelete(null)}>Cancel</Button>
                <Button variant="danger" onClick={()=>confirmSoftDelete()}>Confirm</Button>
            </Modal.Footer>
        </DeleteConfirmationModal>
};