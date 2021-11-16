import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import AlertActions from './../../redux/actions/alert-actions';
import {Alert, Button} from "react-bootstrap";

export const InfoAlert = () => {

    const alertInfo = useSelector(state => state.alert.alertInfo);
    const dispatch = useDispatch();

    function clearAlert() {
        dispatch(AlertActions.clearAlert())
    };

    return alertInfo
            ? <Alert variant={alertInfo.error ? 'danger' : 'success'}>
                <p>{alertInfo.error || alertInfo.success}</p>
                <Button onClick={()=>clearAlert()}>Ok!</Button>
            </Alert>
            : null
};