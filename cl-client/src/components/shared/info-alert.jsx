import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import AlertActions from './../../redux/actions/alert-actions';
import {Button} from "react-bootstrap";
import {AlertContainer} from "../styled-components";

export const InfoAlert = () => {

    const alertInfo = useSelector(state => state.alert.alertInfo);
    const dispatch = useDispatch();

    function clearAlert() {
        dispatch(AlertActions.clearAlert())
    };

    return alertInfo
            ? <AlertContainer variant={alertInfo.error ? 'danger' : 'success'}
                              style={{textAlign: 'center'}}>
                <div className="info-alert-text">{alertInfo.error || alertInfo.success}</div>
                <Button variant={alertInfo.error ? 'danger' : 'success'}
                        onClick={()=>clearAlert()}>Ok!</Button>
            </AlertContainer>
            : null
};