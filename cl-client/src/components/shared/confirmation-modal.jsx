import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import Actions from './../../redux/actions/confirmation-actions';
import {Button, Modal} from 'react-bootstrap';
import {ConfirmationModalContainer} from "../styled-components";

export const ConfirmationModal = () => {

    const dispatch = useDispatch();
    const confirmationDetails = useSelector(state => state.confirmation.confirmationDetails);

    function confirmAction() {
        dispatch(confirmationDetails.confirmedAction(confirmationDetails.actionParameter));
        unmountModal();
    };

    function unmountModal() {
        dispatch(Actions.clearConfirmationRequest());
    };

    return confirmationDetails
            ? <ConfirmationModalContainer>
                <Modal.Header><Modal.Title>Confirm action</Modal.Title></Modal.Header>
                <Modal.Body>{confirmationDetails.question}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={()=>unmountModal()}>Cancel</Button>
                    <Button variant="danger" onClick={()=>confirmAction()}>Confirm</Button>
                </Modal.Footer>
              </ConfirmationModalContainer>
            : null
};