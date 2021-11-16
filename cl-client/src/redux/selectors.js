const contacts = {
    contacts: {
        allActiveContacts: state => state.contacts.allActiveContacts,
        displayedContacts: state => state.contacts.displayedContacts,
        searchValue: state => state.contacts.searchValue
    }
};

export default {contacts};