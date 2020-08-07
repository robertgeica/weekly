import { ROADMAP_LOADED, ROADMAP_ERROR, CURRENT_CATEGORY, ADD_TASK_MODAL, ADD_TASK, DELETE_TASK, UPDATE_TASK, UPDATE_TASK_MODAL, TASK_ID, CURRENT_TASK } from '../actions/types';

const initialState = {
    data: [],
		currentCategory: '',
		toggleAddTaskModal: false,
		toggleUpdateTaskModal: false,
		taskId: '',
		currentTask: {}

};

export default function(state = initialState, action) {
	const { type, payload } = action;

	switch(type) {
		case ROADMAP_LOADED:
			return {...state, data: payload};
		
		case ROADMAP_ERROR:
			return {...state};
	
		case CURRENT_CATEGORY:
			return {...state, currentCategory: payload};

		case ADD_TASK:
		case UPDATE_TASK:
		case DELETE_TASK:
			return {...state, payload};
		
		case TASK_ID:
			return { ...state, taskId: payload };

		case CURRENT_TASK:
			return { ...state, currentTask: payload };

		case UPDATE_TASK_MODAL:
			return { ...state, toggleUpdateTaskModal: payload };

		case ADD_TASK_MODAL:
			return {...state, toggleAddTaskModal: payload};

		default:
			return state;
	}
}

