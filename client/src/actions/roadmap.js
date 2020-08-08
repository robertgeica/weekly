import axios from 'axios';
import {
	ROADMAP_LOADED,
	ROADMAP_ERROR,
	CURRENT_CATEGORY,
	ADD_TASK_MODAL,
	ADD_TASK,
	DELETE_TASK,
	UPDATE_TASK,
	UPDATE_TASK_MODAL,
	TASK_ID,
	CURRENT_TASK
} from './types';

import { addTaskAlert, errorAddTaskAlert, updateTaskAlert, errorUpdateTaskAlert, deleteTaskAlert, errorDeleteTaskAlert } from '../alerts/alerts';


// Load roadmaps from database
export const loadRoadmaps = () => async (dispatch) => {
	try {
		const res = await axios.get('/roadmap');

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
			type: CURRENT_CATEGORY,
			payload: category
		});
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		});
	}
};

// add task id to state and use it in handleUpdateTask(taskId, task) action
export const setTaskId = id => async dispatch => {
	try {
		dispatch({
			type: TASK_ID,
			payload: id
		})
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		})
	}
};

// get current state to complete inputs from update modal
export const setCurrentTask = task => async dispatch => {
	try {
		dispatch({
			type: CURRENT_TASK,
			payload: task
		})
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		})
	}
}


// MODALS actions
// open/close add task modal
export const handleOpenModal = () => (dispatch) => {
	try {
		dispatch({
			type: ADD_TASK_MODAL,
			payload: true
		});
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		});
	}
};

export const handleCloseModal = () => (dispatch) => {
	try {
		dispatch({
			type: ADD_TASK_MODAL,
			payload: false
		});
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		});
	}
};

// open/close update task modal
export const handleOpenUpdateModal = () => dispatch => {
	try {
		dispatch({
			type: UPDATE_TASK_MODAL,
			payload: true
		});
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		})
	}
}

export const handleCloseUpdateModal = () => dispatch => {
	try {
		dispatch({
			type: UPDATE_TASK_MODAL,
			payload: false
		});
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		})
	}
}

// ADD, DELETE, UPDATE actions
export const handleAddTask = (task) => async (dispatch) => {
	try {
		const tasks = await axios.post('/roadmap', task);

		dispatch({
			type: ADD_TASK,
			payload: [ tasks ]
		});

		dispatch(loadRoadmaps());
		dispatch(handleCloseModal());
		addTaskAlert();
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		});
		errorAddTaskAlert();
	}
};

export const handleDeleteTask = (id) => async (dispatch) => {
	try {
		const res = await axios.delete('/roadmap/' + id);

		dispatch({
			type: DELETE_TASK,
			payload: res.data
		});

		dispatch(loadRoadmaps());
		deleteTaskAlert();

	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		});
		errorDeleteTaskAlert();
	}
};

export const handleUpdateTask = (id, newTask) => async (dispatch) => {
	// get task to edit
	const res = await axios.get('/roadmap/' + id);
	const data = res.data;

	try {
		// add new task
		await axios.post('/roadmap/' + id, newTask);

		dispatch({
			type: UPDATE_TASK,
			payload: [ data ]
		});

		dispatch(loadRoadmaps());
		dispatch(handleCloseUpdateModal());
		updateTaskAlert();
	} catch (error) {
		dispatch({
			type: ROADMAP_ERROR
		});
		errorUpdateTaskAlert();
	}
};
