import { DATA_LOADED, DATA_ERROR, ADD_WEEK, DELETE_WEEK, CURRENT_WEEK, CURRENT_DAY, TOGGLE_MODAL, TOGGLE_EDIT_MODAL, UPDATE_CH, UPDATE_DAY, ADD_COMMENT, DELETE_COMMENT } from '../actions/types';

const initialState = {
    data: [],
    currentWeek: {},
    currentDay: {},
    toggleModal: false,
		toggleEditModal: false
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch(type) {
		case DATA_LOADED:
		case UPDATE_DAY:
			return {...state, data: payload};
		
		case DATA_ERROR:
			return {...state};

		case ADD_WEEK:
		case ADD_COMMENT:
		case DELETE_COMMENT:
			return {...state, data: payload};

		case DELETE_WEEK:
		case UPDATE_CH:
			return {...state, payload};

		case CURRENT_WEEK:
			return {...state, currentWeek: payload};
		
		case CURRENT_DAY:
			return {...state, currentDay: payload};

		case TOGGLE_MODAL:
			return {...state, toggleModal: payload};

		case TOGGLE_EDIT_MODAL:
			return {...state, toggleEditModal: payload};

		default:
			return state;
	}
}