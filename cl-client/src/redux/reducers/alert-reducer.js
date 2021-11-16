import {createSlice} from '@reduxjs/toolkit';
import initState from '../init-state';

const alertSlice = createSlice({
    name: "alert",
    initialState: initState.alert,
    reducers: {
        showAlert(state, actions) {
            console.log('ALERT DETAILS IN REDUCER: ', actions.payload)
            state.alertDetails = actions.payload;
        },
        clearAlert(state) {
            state.alertDetails = null;
        }
    }
});

export const {showAlert, clearAlert} = alertSlice.actions;

export default alertSlice.reducer;