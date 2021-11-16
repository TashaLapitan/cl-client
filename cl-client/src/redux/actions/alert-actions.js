import * as AlertReducer from './../reducers/alert-reducer';

const showConflictAlert = alertDetails => dispatch => {
    dispatch(AlertReducer.showConflictAlert(alertDetails));
};

const showInfoAlert = alertInfo => dispatch => {
    dispatch(AlertReducer.showInfoAlert(alertInfo));
};

const clearAlert = () => dispatch => {
    dispatch(AlertReducer.clearAlert());
};

export default {
    showConflictAlert,
    showInfoAlert,
    clearAlert
};