import axios from 'axios';

const setAuthToken = token => {
    if(token) {
        axios.defaults.header.common['auth-token'] = token;
    } else {
        delete axios.defaults.header.common['auth-token'];
    }
};

export default setAuthToken;