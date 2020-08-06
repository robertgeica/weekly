import { ROADMAP_LOADED, ROADMAP_ERROR, CURRENT_CATEGORY_LOADED } from '../actions/types';

const initialState = {
    data: [],
		currentCategory: ''
};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch(type) {
		case ROADMAP_LOADED:
			return {...state, data: payload};
		
		case ROADMAP_ERROR:
			return {...state};
	
		case CURRENT_CATEGORY_LOADED:
			return {...state, currentCategory: payload};


		default:
			return state;
	}
}