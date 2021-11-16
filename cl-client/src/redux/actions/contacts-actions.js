import {contactsService} from "../../services/contacts-service";
import * as ContactsReducer from "./../reducers/contacts-reducer";

const getAllContacts = () => async dispatch => {
    try {
        const allContacts = await contactsService.getAllActiveContacts();
        dispatch(ContactsReducer.getAllContacts(allContacts));
    }
    catch(err) {
        console.warn('Error: ' + err.toString());
    }
};

const filterContacts = searchValue => async dispatch => {
    dispatch(ContactsReducer.filterContacts(searchValue));
};



export default {
    getAllContacts,
    filterContacts
};