import axios from 'axios';
import {SERVER_HOST} from "../mock.env";

const contactsController = SERVER_HOST + '/contact';

export const contactsService = {
    getAllActiveContacts: async () => {
        try {
            const response = await axios.get(`${contactsController}/all_active`);
            return response.data;
        } catch (err) {
            console.warn('Error: ', err.toString());
        }
    },
    addNewContact: async (newContact) => {
        try {
            const response = await axios.post(`${contactsController}/new_contact`, newContact);
            return response.data;
        } catch(err) {
            console.warn('Error: ', err.toString());
        }
    },
    editContact: async (newContact) => {
        try {
            const response = await axios.put(`${contactsController}/update_contact`, newContact);
            return response.data;
        } catch (err) {
            console.warn('Error: ', err.toString());
        }
    },
    softDeleteContact: async (contactID) => {
        try {
            const response = await axios.put(`${contactsController}/soft_delete`, {contact_id: contactID});
            return response.data;
        } catch (err) {
            console.warn('Error: ', err.toString());
        }
    },
    restoreContact: async (contactID) => {
        try {
            const response = await axios.put(`${contactsController}/restore`, {contact_id: contactID});
            return response.data;
        } catch (err) {
            console.warn('Error: ', err.toString());
        }
    },
    overwriteContact: async (newContact) => {
        try {
            const response = await axios.put(`${contactsController}/overwrite`, newContact);
            return response.data;
        } catch (err) {
            console.warn('Error: ', err.toString());
        }
    }
};
