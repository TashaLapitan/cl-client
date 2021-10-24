import React from 'react';
import {Card, Row, Col, Button} from 'react-bootstrap';

export const ContactInfo = (props) => {

    const {first_name, last_name, email, phone_number, comment, change_log} = props.contact;


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
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                </div>
            </Card.Body>
};