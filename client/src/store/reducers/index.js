import {combineReducers} from 'redux';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import bookReducer from './bookReducer';

export default combineReducers(
    {
        authReducer,
        alertReducer,
        bookReducer
    }
)