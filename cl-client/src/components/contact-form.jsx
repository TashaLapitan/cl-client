import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import {contactsService} from "../services/contacts-service";

export const ContactForm = (props) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [comment, setComment] = useState("");

    function renderInput(title, value, changeHandler, placeholder="", required= true) {
        return <Form.Group>
            <Form.Label>{title}</Form.Label>
            <Form.Control value={value}
                          required={required}
                          placeholder={placeholder}
                          onChange={e => changeHandler(e.target.value)}/>
        </Form.Group>
    };

    function renderButtons() {
        return <div>
            <Button onClick={()=> handleSubmit()}>Save</Button>
            <Button onClick={()=> clearForm()}>Cancel</Button>
        </div>
    };

    async function handleSubmit() {
        const validation = validateInputs();
        if (validation.error) {
            alert(validation.error)
            return;
        };

        const newContact = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phoneNumber,
            comment
        };

        const updatedContact = await contactsService.addNewContact(newContact);

        props.setContacts([...props.contacts, updatedContact])
        clearForm();
    };

    function validateInputs() {
        if (!firstName) return {error: "Please provide the first name"};
        if (!lastName) return {error: "Please provide the last name"};
        if (!email) return {error: "Please provide the email"};
        const validEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!validEmail.test(String(email).toLowerCase())) return {error: "Please provide a valid email"};
        if (!phoneNumber) return {error: "Please provide the phone number"};
        return true;
    };

    function clearForm() {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setComment("");
    };

    return <div>
        <h3>Add new contact</h3>
        <Form>

            {renderInput("First name", firstName, setFirstName, "eg.: Jakob")}
            {renderInput("Last name", lastName, setLastName, "eg.: Patinhas")}
            {renderInput("Email", email, setEmail, "eg.: miau@mail.com")}
            {renderInput("Phone number", phoneNumber, setPhoneNumber, "eg.: 0049 444 888 7777")}
            {renderInput("Comment", comment, setComment, "eg.: Good boy", false)}

            {renderButtons()}
        </Form>
    </div>
};