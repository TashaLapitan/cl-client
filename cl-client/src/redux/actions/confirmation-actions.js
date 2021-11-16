import * as ConfirmationReducer from './../reducers/confirmation-reducer';

const requestConfirmation = confirmationDetails => dispatch => {
    dispatch(ConfirmationReducer.requestConfirmation(confirmationDetails));
};

const clearConfirmationRequest = () => dispatch => {
    dispatch(ConfirmationReducer.clearConfirmationRequest());
};

export default {
    requestConfirmation,
    clearConfirmationRequest
};