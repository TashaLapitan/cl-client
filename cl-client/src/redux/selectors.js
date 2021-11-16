const AppSelectors = {
    contacts: {
        allActiveContacts: state => state.contacts.allActiveContacts,
        displayedContacts: state => state.contacts.displayedContacts,
        searchValue: state => state.contacts.searchValue
    },
    confirmation: {
        confirmationDetails: state => state.confirmation.confirmationDetails
    },
    alert: {
        alertDetails: state => state.alert.alertDetails
    }
};

export default {AppSelectors};