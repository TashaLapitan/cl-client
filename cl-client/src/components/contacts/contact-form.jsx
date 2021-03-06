import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Actions from './../../redux/actions/contacts-actions';
import {Form, Button, Alert} from 'react-bootstrap';
import {ContactFormContainer, ContactFormStyled, FormBtnWrapper} from "../styled-components";

export const ContactForm = (props) => {

    const dispatch = useDispatch();
    const contactToEdit = useSelector(state => state.contacts.contactToEdit);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [comment, setComment] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [validationError, setValidationError] = useState("");

    function renderInput(title, value, changeHandler, placeholder="", required= true) {
        return <Form.Group>
            <Form.Label>{title}</Form.Label>
            <Form.Control value={value}
                          required={required}
                          placeholder={placeholder}
                          disabled={title==='Email' && isEdit}
                          onChange={e => changeHandler(e.target.value)}/>
        </Form.Group>
    };

    function renderButtons() {
        return <FormBtnWrapper>
            <Button variant="secondary" onClick={()=> handleSubmit()}>Save</Button>
            <Button variant="outline-secondary" onClick={()=> clearForm()}>Cancel</Button>
        </FormBtnWrapper>
    };

    async function handleSubmit() {
        const validation = validateInputs();
        if (validation.error) {
            setValidationError(validation.error);
            return;
        };
        setValidationError("");

        const newContact = {
            first_name: firstName,
            last_name: lastName,
            email,
            phone_number: phoneNumber,
            comment
        };
        if (isEdit)  {
            newContact.contact_id = contactToEdit.id;
            dispatch(Actions.editContact(newContact));
        } else {
            dispatch(Actions.addNewContact(newContact))
        };
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
        dispatch(Actions.updateContactToEdit(null));
        setValidationError("");
        setIsEdit(false);
    };

    useEffect(() => {
        setFirstName(contactToEdit ? contactToEdit.first_name : "");
        setLastName(contactToEdit ? contactToEdit.last_name : "");
        setEmail(contactToEdit ? contactToEdit.email : "");
        setPhoneNumber(contactToEdit ? contactToEdit.phone_number : "");
        setComment(contactToEdit ? contactToEdit.comment : "");
        setIsEdit(!!contactToEdit);
    }, [contactToEdit])

    return <ContactFormContainer>
        <h3>{isEdit ? "Edit contact" : "Add new contact"}</h3>
        <ContactFormStyled>

            {renderInput("First name", firstName, setFirstName, "eg.: Jakob")}
            {renderInput("Last name", lastName, setLastName, "eg.: Patinhas")}
            {renderInput("Email", email, setEmail, "eg.: miau@mail.com")}
            {renderInput("Phone number", phoneNumber, setPhoneNumber, "eg.: 0049 444 888 7777")}
            {renderInput("Comment", comment, setComment, "eg.: Good boy", false)}

            {validationError && <Alert variant="danger">{validationError}</Alert>}

            {renderButtons()}
        </ContactFormStyled>
    </ContactFormContainer>
};