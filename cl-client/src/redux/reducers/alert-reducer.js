import {createSlice} from '@reduxjs/toolkit';
import initState from '../init-state';

const alertSlice = createSlice({
    name: "alert",
    initialState: initState.alert,
    reducers: {
        showConflictAlert(state, actions) {
            window.scroll(0,0);
            state.alertDetails = actions.payload;
        },
        showInfoAlert(state, actions) {
            window.scroll(0,0);
            state.alertInfo = actions.payload;
        },
        clearAlert(state) {
            state.alertDetails = null;
            state.alertInfo = null;
        }
    }
});

export const {showConflictAlert, clearAlert, showInfoAlert} = alertSlice.actions;

export default alertSlice.reducer;