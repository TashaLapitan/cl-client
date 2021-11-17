import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import ConfirmationActions from './../../redux/actions/confirmation-actions';
import ContactActions from './../../redux/actions/contacts-actions';
import {Card, Row, Col, Button} from 'react-bootstrap';
import {ContactCard, ContactCardBtnWrapper, EditDeleteBtnWrapper, InfoRow} from "../styled-components";

export const ContactInfo = (props) => {

    const dispatch = useDispatch();

    const {first_name, last_name, email, phone_number, comment, change_log} = props.contact;
    const [showInfo, setShowInfo] = useState(true);

    function prepareEdit() {
        dispatch(ContactActions.updateContactToEdit(props.contact));
    };

    function prepareDelete() {
        const confirmationDetails = {
            question: `Are you sure you want to delete ${email} from your contacts?`,
            confirmedAction: ContactActions.softDeleteContact,
            actionParameter: props.contact.id
        };
        dispatch(ConfirmationActions.requestConfirmation(confirmationDetails));
    };

    function renderContactInfo() {
        return <Card.Body>
            <Card.Title>{last_name}, {first_name}</Card.Title>
            {comment && <p className="text-muted">{comment}</p>}
            <Card.Text>
                <InfoRow>
                    <Col md={4}>Email:</Col>
                    <Col md={8}><strong>{email}</strong></Col>
                </InfoRow>
                <InfoRow>
                    <Col md={4}>Phone:</Col>
                    <Col md={8}><strong>{phone_number}</strong></Col>
                </InfoRow>
            </Card.Text>
            <ContactCardBtnWrapper>
                <EditDeleteBtnWrapper>
                    <Button variant="outline-secondary" onClick={()=>prepareEdit()}>Edit</Button>
                    <Button variant="outline-danger" onClick={()=>prepareDelete()}>Delete</Button>
                </EditDeleteBtnWrapper>
                <Button variant="outline-secondary" onClick={()=>setShowInfo(false)}>History</Button>
            </ContactCardBtnWrapper>
        </Card.Body>
    };

    function prettifyDate(dateStr) {
        return new Date(dateStr).toDateString().slice(4,15);
    };

    function renderContactHistory() {
        return <Card.Body>
            <Card.Title>Contact history log</Card.Title>
            <div className="card-text" style={{padding: 10}}>
                {change_log.map((r, i) => {
                    return  <Row key={i} style={{marginBottom: 10}}>
                        <Col md={4}>{prettifyDate(r.created_at)}</Col>
                        <Col md={8}>{r.details}</Col>
                    </Row>
                })}
            </div>
            <ContactCardBtnWrapper>
                <Button variant="outline-secondary" onClick={()=> setShowInfo(true)}>Close history</Button>
            </ContactCardBtnWrapper>
        </Card.Body>
    };

    return <ContactCard>
        {showInfo ? renderContactInfo() : renderContactHistory()}
    </ContactCard>
};