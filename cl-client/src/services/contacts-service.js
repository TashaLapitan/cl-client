import axios from 'axios';
import {SERVER_HOST} from "../mock.env";

const contactsController = SERVER_HOST + '/contact';

export const contactsService = {
    getAllActiveContacts: async () => {
        try {
            const response = await axios.get(`${contactsController}/all_active`);
            return response.data;
        } catch (err) {
            console.log(err)
        }
    },
    addNewContact: async (newContact) => {
        try {
            const response = await axios.post(`${contactsController}/new_contact`, newContact);
            return response.data;
        } catch(err) {
            console.log(err)
        }
    }
}