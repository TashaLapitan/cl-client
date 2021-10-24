import React, {useState} from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';

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
                    <Row>
                        <Col md={4}>Email:</Col>
                        <Col md={8}>{email}</Col>
                    </Row>
                    <Row>
                        <Col md={4}>Phone number:</Col>
                        <Col md={8}>{phone_number}</Col>
                    </Row>
                </Card.Text>
                <div>
                    <div>
                        <Button onClick={()=>prepareEdit()}>Edit</Button>
                        <Button onClick={()=>prepareDelete()}>Delete</Button>
                    </div>
                    <Button onClick={()=>setShowInfo(false)}>History</Button>
                </div>
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
                <div>
                    <Button onClick={()=> setShowInfo(true)}>Close history</Button>
                </div>
            </Card.Body>
    };

    return <Card>
                {showInfo ? renderContactInfo() : renderContactHistory()}
            </Card>
};