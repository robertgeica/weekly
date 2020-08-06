import axios from 'axios';
import {
	ROADMAP_LOADED,
	ROADMAP_ERROR,
	CURRENT_CATEGORY_LOADED
} from './types';

// Load roadmaps from database
export const loadRoadmaps = () => async (dispatch) => {
	try {
		const res = await axios.get('http://localhost:4000/roadmap');

		dispatch({
			type: ROADMAP_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		});
	}
};

// add current category to state
export const currentCategory = (category) => async (dispatch) => {
	try {
		dispatch({
			type: CURRENT_CATEGORY_LOADED,
			payload: category
		});
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		});
	}
};