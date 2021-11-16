import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import AlertActions from './../../redux/actions/alert-actions';
import {Alert, Button} from "react-bootstrap";
import {ConflictBtnWrapper} from "../styled-components";

export const ConflictAlert = () => {

    console.log('CONFLICT ALERT')

    const alertDetails = useSelector(state => state.alert.alertDetails);
    const dispatch = useDispatch();

    function actionOne() {
        if (alertDetails.actionOneParameter) {
            dispatch(alertDetails.actionOne(alertDetails.actionOneParameter));
        } else dispatch(alertDetails.actionOne());
        unmountAlert();
    };

    function actionTwo() {
        if (alertDetails.actionTwoParameter) {
            dispatch(alertDetails.actionTwo(alertDetails.actionTwoParameter));
        } else dispatch(alertDetails.actionTwo());
        unmountAlert();
    };

    function unmountAlert() {
        dispatch(AlertActions.clearAlert());
    };

    function renderButtons() {
        return <ConflictBtnWrapper>
            <Button variant="outline-secondary" onClick={()=> unmountAlert()}>Close</Button>
            <Button variant="outline-success" onClick={()=>actionOne()}>Restore</Button>
            <Button variant="outline-danger" onClick={()=>actionTwo()}>Overwrite</Button>
        </ConflictBtnWrapper>

    };

    return alertDetails
            ? <Alert variant='warning'>
                <Alert.Heading>Conflict</Alert.Heading>
                <p>{alertDetails.message}</p>
                {renderButtons()}
            </Alert>
            : null
};