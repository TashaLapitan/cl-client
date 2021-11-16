import {createSlice} from '@reduxjs/toolkit';
import initState from '../init-state';
import * as _ from 'underscore';

const contactsSlice = createSlice({
    name: "contacts",
    initialState: initState.contacts,
    reducers: {
        getAllContacts(state, actions) {
            state.allActiveContacts = actions.payload;
            state.displayedContacts = actions.payload;
            state.searchValue = "";
        },
        filterContacts(state, action) {
            let searchValue = action.payload.toLowerCase();
            if (!searchValue) {
                state.searchValue = "";
                state.displayedContacts = state.allActiveContacts;
            } else {
                state.searchValue = searchValue;
                state.displayedContacts = _.filter(state.allActiveContacts, contact => {
                    return contact.first_name.toLowerCase().includes(searchValue) ||
                        contact.last_name.toLowerCase().includes(searchValue) ||
                        contact.email.toLowerCase().includes(searchValue) ||
                        contact.phone_number.toLowerCase().includes(searchValue) ||
                        (contact.comment && contact.comment.toLowerCase().includes(searchValue))
                });
            }
        },
        addNewContact(state, action) {
            const newContact = action.payload;
            const updatedContacts = _.sortBy([...state.allActiveContacts, newContact], contact => contact.last_name)
            state.allActiveContacts = updatedContacts;
            state.displayedContacts = updatedContacts;
        },
        editContact(state, action) {
            const updatedContact = action.payload;
            const updatedContacts = _.map(state.allActiveContacts, contact => {
                return contact.id == updatedContact.id ? updatedContact : contact
            });
            state.allActiveContacts = updatedContacts;
            state.displayedContacts = updatedContacts;
        },
        removeContact(state, action) {
            const contactId = action.payload;
            const updatedContacts = _.reject(state.allActiveContacts, contact => contact.id == contactId);
            state.allActiveContacts = updatedContacts;
            state.displayedContacts = updatedContacts;
        }
    }
});

export const {getAllContacts, filterContacts, addNewContact, editContact, removeContact} = contactsSlice.actions;

export default contactsSlice.reducer;