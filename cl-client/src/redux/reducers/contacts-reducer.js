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
        }
    }
});

export const {getAllContacts, filterContacts} = contactsSlice.actions;

export default contactsSlice.reducer;