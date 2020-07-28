import { DATA_LOADED, DATA_ERROR, ADD_WEEK, DELETE_WEEK, CURRENT_WEEK, CURRENT_DAY, TOGGLE_MODAL } from '../actions/types';

const initialState = {
    data: [],
    currentWeek: {},
    currentDay: {},
    toggleModal: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch(type) {
		case DATA_LOADED:
			return {...state, data: payload};
		
		case DATA_ERROR:
			return {...state};

		case ADD_WEEK:
			return {...state, data: payload};

		case DELETE_WEEK:
			return {...state, payload};

		case CURRENT_WEEK:
			return {...state, currentWeek: payload};
		
		case CURRENT_DAY:
			return {...state, currentDay: payload};

		case TOGGLE_MODAL:
			return {...state, toggleModal: payload};

		default:
			return state;
	}
}