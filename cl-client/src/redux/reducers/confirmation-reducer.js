import {createSlice} from '@reduxjs/toolkit';
import initState from '../init-state';

const confirmationSlice = createSlice({
    name: "confirmation",
    initialState: initState.confirmation,
    reducers: {
        requestConfirmation(state, actions) {
            state.confirmationDetails = actions.payload;
        },
        clearConfirmationRequest(state) {
            state.confirmationDetails = null;
        }
    }
});

export const {requestConfirmation, clearConfirmationRequest} = confirmationSlice.actions;

export default confirmationSlice.reducer;