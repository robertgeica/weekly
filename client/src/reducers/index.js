import { combineReducers } from 'redux';
import auth from './auth';
import weeks from './weeks';

export default combineReducers({
    auth,
    weeks
});