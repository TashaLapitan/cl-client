import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import Actions from './../../redux/actions/confirmation-actions';
import {Button, Modal} from 'react-bootstrap';
import {ConfirmationModalWrapper} from "../styled-components";

export const ConfirmationModal = () => {

    const dispatch = useDispatch();
    const confirmationDetails = useSelector(state => state.confirmation.confirmationDetails);

    function confirmAction() {
        if (confirmationDetails.actionParameter) {
            dispatch(confirmationDetails.confirmedAction(confirmationDetails.actionParameter));
        } else dispatch(confirmationDetails.confirmedAction());
        unmountModal();
    };

    function unmountModal() {
        dispatch(Actions.clearConfirmationRequest());
    };

    return confirmationDetails
            ? <ConfirmationModalWrapper>
                <Modal.Header><Modal.Title>Confirm action</Modal.Title></Modal.Header>
                <Modal.Body>{confirmationDetails.question}</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={()=>unmountModal()}>Cancel</Button>
                    <Button variant="danger" onClick={()=>confirmAction()}>Confirm</Button>
                </Modal.Footer>
            </ConfirmationModalWrapper>
            : null
};