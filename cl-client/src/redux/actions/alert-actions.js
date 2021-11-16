import * as AlertReducer from './../reducers/alert-reducer';

const showAlert = alertDetails => dispatch => {
    dispatch(AlertReducer.showAlert(alertDetails));
};

const clearAlert = () => dispatch => {
    dispatch(AlertReducer.clearAlert());
};

export default {
    showAlert,
    clearAlert
};