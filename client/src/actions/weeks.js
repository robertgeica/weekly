import axios from 'axios';
import {
	DATA_LOADED,
	DATA_ERROR,
	ADD_WEEK,
	DELETE_WEEK,
	CURRENT_WEEK,
	CURRENT_DAY,
	TOGGLE_MODAL,
	TOGGLE_EDIT_MODAL,
	UPDATE_CH,
	ADD_COMMENT,
	DELETE_COMMENT,
	UPDATE_DAY
} from './types';

import { addWeekAlert, deleteWeekAlert, updateWeekAlert, addCommentAlert, removeCommentAlert } from '../alerts/alerts';
// Load weeks from database
export const loadWeeks = () => async (dispatch) => {
	try {
		const res = await axios.get('http://localhost:4000/weeks');

		dispatch({
			type: DATA_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

// Load current week to state
export const currentWeek = (week) => async (dispatch) => {
	try {
		dispatch({
			type: CURRENT_WEEK,
			payload: week
		});
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

// Load current day to state
export const currentDay = (day) => async (dispatch) => {
	try {
		dispatch({
			type: CURRENT_DAY,
			payload: day
		});
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

// open/close modal
export const handleOpenModal = () => (dispatch) => {
	try {
		dispatch({
			type: TOGGLE_MODAL,
			payload: true
		});
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};
export const handleCloseModal = () => (dispatch) => {
	try {
		dispatch({
			type: TOGGLE_MODAL,
			payload: false
		});
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

// toggle edit/body modal
export const toggleEditModal = () => (dispatch) => {
	try {
		dispatch({
			type: TOGGLE_EDIT_MODAL,
			payload: true
		});
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

export const toggleBodyModal = () => (dispatch) => {
	try {
		dispatch({
			type: TOGGLE_EDIT_MODAL,
			payload: false
		});
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

// Add new week
export const handleAddWeek = () => async (dispatch) => {
	try {
		const data = await axios.get('http://localhost:4000/weeks');
		let weekToAdd = 1;
		const existingWeeks = [];

		data.data.map((week) => {
			existingWeeks.push(week.week);

			const [ min, max ] = [ Math.min(...existingWeeks), Math.max(...existingWeeks) ];
			const missingWeek = Array.from(Array(max - min), (v, i) => i + min).filter(
				(i) => !existingWeeks.includes(i)
			);

			if (missingWeek.length == 0) {
				if (data.data.length == 0) {
					weekToAdd = 1;
				}
				weekToAdd = data.data.length + 1;
			} else {
				weekToAdd = missingWeek[0];
			}
		});

		const newWeek = {
			week: weekToAdd,
			weekFocus: {
				learnTask1: '',
				practiceTask1: '',
				learnHoursTask1: '',
				practiceHoursTask1: '',

				learnTask2: '',
				practiceTask2: '',
				learnHoursTask2: '',
				practiceHoursTask2: '',

				learnTask3: '',
				practiceTask3: '',
				learnHoursTask3: '',
				practiceHoursTask: ''
			},

			days: [
				{
					day: (weekToAdd - 1) * 7 + 1,
					completedHours: 0,
					tasks: {
						h1: '',
						h2: '',
						h3: '',
						h4: '',
						h5: ''
					},
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 2,
					completedHours: 0,
					tasks: {
						h1: '',
						h2: '',
						h3: '',
						h4: '',
						h5: ''
					},
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 3,
					completedHours: 0,
					tasks: {
						h1: '',
						h2: '',
						h3: '',
						h4: '',
						h5: ''
					},
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 4,
					completedHours: 0,
					tasks: {
						h1: '',
						h2: '',
						h3: '',
						h4: '',
						h5: ''
					},
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 5,
					completedHours: 0,
					tasks: {
						h1: '',
						h2: '',
						h3: '',
						h4: '',
						h5: ''
					},
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 6,
					completedHours: 0,
					tasks: {
						h1: '',
						h2: '',
						h3: '',
						h4: '',
						h5: ''
					},
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 7,
					completedHours: 0,
					tasks: {
						h1: '',
						h2: '',
						h3: '',
						h4: '',
						h5: ''
					},
					comments: []
				}
			]
		};

		const res = await axios.post('http://localhost:4000/weeks', newWeek);

		dispatch({
			type: ADD_WEEK,
			payload: data.data
		});
		dispatch(loadWeeks());
		addWeekAlert();
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

// Delete a week
export const handleDeleteWeek = (id) => async (dispatch) => {
	try {
		const res = await axios.delete('http://localhost:4000/weeks/' + id);
		// console.log(res);

		dispatch({
			type: DELETE_WEEK,
			payload: res.data
		});
		dispatch(loadWeeks());
		dispatch(handleCloseModal());
		deleteWeekAlert();
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

// Update completed hours of a day
export const handleUpdateCH = (id, operator, day) => async (dispatch) => {
	try {
		const req = await axios.get('http://localhost:4000/weeks/' + id);
		const data = req.data;

		let newCH;
		const crtDay = day.day % 7 == 0 ? 6 : day.day % 7 - 1;

		// check operator
		if (operator == '+') {
			newCH = data.days[crtDay].completedHours + 1;
		} else if (operator == '-') {
			newCH = data.days[crtDay].completedHours - 1;
		} else {
			console.log('operator error');
		}

		const newWeek = {
			week: data.week,
			weekFocus: {
				...data.weekFocus
			},
			days: [
				{
					...data.days[crtDay],
					day: day.day,
					completedHours: newCH
				}
			]
		};

		const res = await axios.post('http://localhost:4000/weeks/' + id, newWeek);
		dispatch({
			type: UPDATE_CH,
			payload: [ data ]
		});
		dispatch(loadWeeks());

		dispatch(currentDay(newWeek.days[0]));
		updateWeekAlert();
		
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
		console.log('err ch');
	}
};

// Add comment
export const handleAddComment = (weekId, index, day, comment) => async (dispatch) => {
	const dataReq = await axios.get('http://localhost:4000/weeks/' + weekId);
	try {
		const data = dataReq.data;

		const updatedWeek = {
			...data,
			days: [
				{
					day: day,
					completedHours: data.days[index].completedHours,
					tasks: {
						h1: data.days[index].tasks.h1,
						h2: data.days[index].tasks.h2,
						h3: data.days[index].tasks.h3,
						h4: data.days[index].tasks.h4,
						h5: data.days[index].tasks.h5
					},
					comments: [ ...data.days[index].comments, comment ]
				}
			]
		};

		const res = await axios.post('http://localhost:4000/weeks/' + weekId, updatedWeek);
		
		dispatch({
			type: ADD_COMMENT,
			payload: [ data ]
		});

		dispatch(currentDay(updatedWeek.days[0]));
		dispatch(loadWeeks());
		addCommentAlert();

	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

// Delete comment
export const handleDeleteComment = (dayIndex, day, comment, weekId) => async (dispatch) => {
	const dataReq = await axios.get('http://localhost:4000/weeks/' + weekId);

	try {

		const data = dataReq.data;
		const comments = data.days[dayIndex].comments;
		const index = comments.indexOf(comment);

		if (index > -1) {
			comments.splice(index, 1);
		}

		const updatedWeek = {
			...data,
			days: [
				{
					day: day,
					completedHours: data.days[dayIndex].completedHours,
					tasks: {
						h1: data.days[dayIndex].tasks.h1,
						h2: data.days[dayIndex].tasks.h2,
						h3: data.days[dayIndex].tasks.h3,
						h4: data.days[dayIndex].tasks.h4,
						h5: data.days[dayIndex].tasks.h5
					},
					comments: [ ...comments ]
				}
			]
		};

		const res = await axios.post('http://localhost:4000/weeks/' + weekId, updatedWeek);

		dispatch({
			type: DELETE_COMMENT,
			payload: [ data ]
		});

		dispatch(currentDay(updatedWeek.days[0]));
		dispatch(loadWeeks());
		removeCommentAlert();

	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};


// Update day tasks
export const handleUpdateDay = (id, index, day, week) => async (dispatch) => {
	try {

		const req = await axios.get('http://localhost:4000/weeks/' + id);
		const data = req.data;

		const newWeek = {
			...data,
			weekFocus: {
				learnTask1: week.weekFocus.learnTask1,
				practiceTask1: week.weekFocus.practiceTask1,
				learnHoursTask1: week.weekFocus.learnHoursTask1,
				practiceHoursTask1: week.weekFocus.practiceHoursTask1,
				learnTask2: week.weekFocus.learnTask2,
				practiceTask2: week.weekFocus.practiceTask2,
				learnHoursTask2: week.weekFocus.learnHoursTask2,
				practiceHoursTask2: week.weekFocus.practiceHoursTask2,
				learnTask3: week.weekFocus.learnTask3,
				practiceTask3: week.weekFocus.practiceTask3,
				learnHoursTask3: week.weekFocus.learnHoursTask3,
				practiceHoursTask3: week.weekFocus.practiceHoursTask3
			},

			days: [
				{
					day: data.days[index].day,
					completedHours: data.days[index].completedHours,
					tasks: {
						h1: day.tasks.h1,
						h2: day.tasks.h2,
						h3: day.tasks.h3,
						h4: day.tasks.h4,
						h5: day.tasks.h5
					},
					comments: [ ...data.days[index].comments ]
				}
			]
		};

		const res = await axios.post('http://localhost:4000/weeks/' + id, newWeek);

		dispatch({
			type: UPDATE_DAY,
			payload: [ data ]
		});

		dispatch(toggleBodyModal());
		dispatch(currentDay(day));
		dispatch(currentWeek(newWeek));
		dispatch(loadWeeks());
		updateWeekAlert();

	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};
