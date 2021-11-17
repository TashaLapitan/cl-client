import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import AlertActions from './../../redux/actions/alert-actions';
import {Alert, Button} from "react-bootstrap";
import {AlertContainer, ConflictBtnWrapper} from "../styled-components";

export const ConflictAlert = () => {

    const alertDetails = useSelector(state => state.alert.alertDetails);
    const dispatch = useDispatch();

    function actionOne() {
        dispatch(alertDetails.actionOne(alertDetails.actionOneParameter));
        unmountAlert();
    };

    function actionTwo() {
        dispatch(alertDetails.actionTwo(alertDetails.actionTwoParameter));
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
            ? <AlertContainer variant='warning' style={{textAlign: 'center', paddingLeft: '20vw', paddingRight: '20vw'}}>
                <Alert.Heading>Conflict</Alert.Heading>
                <p>{alertDetails.message}</p>
                {renderButtons()}
            </AlertContainer>
            : null
};