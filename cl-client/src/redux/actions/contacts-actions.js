import {contactsService} from "../../services/contacts-service";
import * as ContactsReducer from "./../reducers/contacts-reducer";
import * as AlertReducer from "./../reducers/alert-reducer";

const getAllContacts = () => async dispatch => {
    try {
        const allContacts = await contactsService.getAllActiveContacts();
        dispatch(ContactsReducer.getAllContacts(allContacts));
    }
    catch(err) {
        console.warn('Error: ' + err.toString());
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
            dispatch(AlertReducer.showAlert(conflictDetails));
        } else if (newContact.error && newContact.error.reason == 'active') {
            // handleErrorMessage
        } else dispatch(ContactsReducer.addNewContact(newContact));
    } catch(err) {
        console.warn('Error: ' + err.toString());
    }
};

const editContact = contact => async dispatch => {
    try {
        const newContact = await contactsService.editContact(contact);
        dispatch(ContactsReducer.editContact(newContact));
    } catch(err) {
        console.warn('Error: ' + err.toString());
    }
};

const softDeleteContact = contactId => async dispatch => {
    try {
        const isDeleted = await contactsService.softDeleteContact(contactId);
        if (isDeleted.success) dispatch(ContactsReducer.removeContact(contactId))
        // TODO handle errors
    } catch(err) {
        console.warn('Error: ' + err.toString());
    }
};

const restoreContact = contactId => async dispatch => {
    try {
        const restoredContact = await contactsService.restoreContact(contactId);
        dispatch(ContactsReducer.addNewContact(restoredContact));
    } catch(err) {
        console.warn('Error: ' + err.toString());
    }
};

const overwriteContact = (params) => async dispatch => {
    try {
        const newContact = await contactsService.overwriteContact(params);
        dispatch(ContactsReducer.addNewContact(newContact));
    } catch(err) {
        console.warn('Error: ' + err.toString());
    }
};

export default {
    getAllContacts,
    filterContacts,
    addNewContact,
    editContact,
    softDeleteContact,
    restoreContact,
    overwriteContact
};