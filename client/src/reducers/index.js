import { combineReducers } from 'redux';
import auth from './auth';
import weeks from './weeks';
import roadmap from './roadmap';

export default combineReducers({
    auth,
    weeks,
    roadmap
});