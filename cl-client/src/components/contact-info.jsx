import React, {useState} from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';
import {ContactCard, ContactCardBtnWrapper, EditDeleteBtnWrapper, InfoRow} from "./styled-components";

export const ContactInfo = (props) => {

    const {first_name, last_name, email, phone_number, comment, change_log} = props.contact;
    const [showInfo, setShowInfo] = useState(true);

    function prepareEdit() {
        props.setContactToEdit(props.contact);
    };

    function prepareDelete() {
        props.setContactToDelete(props.contact);
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
            <Card.Text>
                {change_log.map((r, i) => {
                    return  <Row key={i}>
                        <Col md={4}>{prettifyDate(r.created_at)}</Col>
                        <Col md={8}>{r.details}</Col>
                    </Row>
                })}
            </Card.Text>
            <ContactCardBtnWrapper>
                <Button variant="outline-secondary" onClick={()=> setShowInfo(true)}>Close history</Button>
            </ContactCardBtnWrapper>
        </Card.Body>
    };

    return <ContactCard>
        {showInfo ? renderContactInfo() : renderContactHistory()}
    </ContactCard>
};