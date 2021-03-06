import {contactsService} from "../../services/contacts-service";
import * as ContactsReducer from "./../reducers/contacts-reducer";
import * as AlertReducer from "./../reducers/alert-reducer";

const getAllContacts = () => async dispatch => {
    try {
        const allContacts = await contactsService.getAllActiveContacts();
        dispatch(ContactsReducer.getAllContacts(allContacts));
    }
    catch(err) {
        dispatch(AlertReducer.showInfoAlert({error: err.toString()}));
    }
};

const filterContacts = searchValue => dispatch => {
    dispatch(ContactsReducer.filterContacts(searchValue));
};

const addNewContact = contact => async dispatch => {
    try {
        const newContact = await contactsService.addNewContact(contact);
        if (newContact.error && newContact.error.reason == 'inactive') {
            const conflictDetails = {
                message: newContact.error.message,
                actionOne: restoreContact,
                actionOneParameter: newContact.error.contact_id,
                actionTwo: overwriteContact,
                actionTwoParameter: {contact_id: newContact.error.contact_id, ...contact}
            };
            dispatch(AlertReducer.showConflictAlert(conflictDetails));
        } else if (newContact.error && newContact.error.reason == 'active') {
            dispatch(AlertReducer.showInfoAlert({error: newContact.error.message}));
        } else {
            dispatch(ContactsReducer.addNewContact(newContact));
            dispatch(AlertReducer.showInfoAlert({success: `${newContact.email} successfully added`}));
        }
    } catch(err) {
        dispatch(AlertReducer.showInfoAlert({error: err.toString()}));
    }
};

const updateContactToEdit = contact => dispatch => {
    dispatch(ContactsReducer.updateContactToEdit(contact));
};

const editContact = contact => async dispatch => {
    try {
        const updatedContact = await contactsService.editContact(contact);
        dispatch(ContactsReducer.editContact(updatedContact));
        dispatch(AlertReducer.showInfoAlert({success: `${updatedContact.email} successfully updated`}));
    } catch(err) {
        dispatch(AlertReducer.showInfoAlert({error: err.toString()}));
    }
};

const softDeleteContact = contactId => async dispatch => {
    try {
        const isDeleted = await contactsService.softDeleteContact(contactId);
        if (isDeleted.success) {
            dispatch(ContactsReducer.removeContact(contactId));
            dispatch(AlertReducer.showInfoAlert({success: `Contact successfully deleted`}));
        }
        else if (isDeleted.error) dispatch(AlertReducer.showInfoAlert({error: isDeleted.error}));
    } catch(err) {
        dispatch(AlertReducer.showInfoAlert({error: err.toString()}));
    }
};

const restoreContact = contactId => async dispatch => {
    try {
        const restoredContact = await contactsService.restoreContact(contactId);
        dispatch(ContactsReducer.addNewContact(restoredContact));
        dispatch(AlertReducer.showInfoAlert({success: `${restoredContact.email} successfully restored`}));
    } catch(err) {
        dispatch(AlertReducer.showInfoAlert({error: err.toString()}));
    }
};

const overwriteContact = contact => async dispatch => {
    try {
        const newContact = await contactsService.overwriteContact(contact);
        dispatch(ContactsReducer.addNewContact(newContact));
        dispatch(AlertReducer.showInfoAlert({success: `${newContact.email} successfully added`}));
    } catch(err) {
        dispatch(AlertReducer.showInfoAlert({error: err.toString()}));
    }
};

export default {
    getAllContacts,
    filterContacts,
    addNewContact,
    updateContactToEdit,
    editContact,
    softDeleteContact,
    restoreContact,
    overwriteContact
};