import * as Redux from 'redux';
import {combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import * as ReduxDevtoolsExtension from 'redux-devtools-extension';
import * as ReduxLogger from 'redux-logger';
import contactsReducer from './reducers/contacts-reducer';
import confirmationReducer from './reducers/confirmation-reducer';
import alertReducer from './reducers/alert-reducer';

const rootReducer = combineReducers({
    contacts: contactsReducer,
    confirmation: confirmationReducer,
    alert: alertReducer
});

const loggerMiddleware = ReduxLogger.createLogger({
    collapsed: true,
    duration: true,
    logErrors: true,
    diff: true,
});

const store = Redux.createStore(rootReducer, ReduxDevtoolsExtension.composeWithDevTools(Redux.applyMiddleware(thunkMiddleware, loggerMiddleware)));

export default store;
