import axios from 'axios';
import { REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR, LOGOUT } from './types';
import setAuthToken from '../utils/setAuthToken';

// Load user
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('http://localhost:4000/auth');

		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR
		});
		console.log('Error loading user');
	}
};

// Register uer
export const register = ({ username, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	};
	const body = JSON.stringify({ username, email, password });

	try {
		const res = await axios.post('/register', body, config);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
		console.log('ok user');
	} catch (error) {
		if (error) {
			console.log('Error', error);
		}

		dispatch({
			type: REGISTER_FAIL
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	const body = { email, password };

	try {
		const res = await axios.post('/auth', body);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});

		dispatch(loadUser());
	} catch (error) {
		if (error) {
			console.log('Error', error);
		}

		dispatch({
			type: LOGIN_FAIL
		});
	}
};

// Logout
export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT
	});
};
