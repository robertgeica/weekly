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
	UPDATE_DAY,
	ADD_WEEKFOCUS,
	UPDATE_WEEKFOCUS,
	DELETE_WEEKFOCUS,
	ADD_DAY_SLOT,
	DELETE_SLOT,
	UPDATE_COMMENT
} from './types';

import {
	addWeekAlert,
	deleteWeekAlert,
	updateWeekAlert,
	addCommentAlert,
	removeCommentAlert,
	invalidInputAlert
} from '../alerts/alerts';
// Load weeks from database
export const loadWeeks = () => async (dispatch) => {
	try {
		const res = await axios.get('/api/weeks');

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
		const data = await axios.get('/api/weeks');
		let weekToAdd = 1;
		const existingWeeks = [];

		data.data.map((week) => {
			existingWeeks.push(week.week);
			existingWeeks.sort();

			let missingWeek = [];
			let count = existingWeeks.length;

			for (let i = 1; i <= count; i++) {
				if (existingWeeks.indexOf(i) == -1) {
					missingWeek.push(i);
				}
			}

			missingWeek.length == 0 ? (weekToAdd = data.data.length + 1) : (weekToAdd = missingWeek[0]);
		});

		const newWeek = {
			week: weekToAdd,
			weekFocus: [],

			days: [
				{
					day: (weekToAdd - 1) * 7 + 1,
					completedHours: 0,
					tasks: [],
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 2,
					completedHours: 0,
					tasks: [],
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 3,
					completedHours: 0,
					tasks: [],
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 4,
					completedHours: 0,
					tasks: [],
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 5,
					completedHours: 0,
					tasks: [],
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 6,
					completedHours: 0,
					tasks: [],
					comments: []
				},
				{
					day: (weekToAdd - 1) * 7 + 7,
					completedHours: 0,
					tasks: [],
					comments: []
				}
			]
		};

		await axios.post('/api/weeks', newWeek);

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
		const res = await axios.delete('/api/weeks/' + id);
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

// Add new slot at todayfocus
export const handleAddSlot = (id, index, slotTask) => async (dispatch) => {
	try {
		const req = await axios.get('/api/weeks/' + id);
		const data = req.data;

		const crtDay = index % 7 == 0 ? 6 : index % 7 - 1;

		const newSlot = {
			taskName: slotTask,
			slotNumber: data.days[crtDay].tasks.length
		};

		const newWeek = {
			...data,
			days: [
				{
					day: data.days[crtDay].day,
					completedHours: data.days[crtDay].completedHours,
					tasks: [ ...data.days[crtDay].tasks, newSlot ],
					comments: [ ...data.days[crtDay].comments ]
				}
			]
		};
		await axios.post('/api/weeks/' + id, { newWeek, slotId: newSlot.slotNumber });

		dispatch({
			type: ADD_DAY_SLOT,
			payload: [ newWeek ]
		});

		dispatch(loadWeeks());
		dispatch(currentDay(newWeek.days[0]));
	} catch (error) {
		console.log(error);
	}
};

// Update completed hours of a day
export const handleUpdateCH = (id, operator, day) => async (dispatch) => {
	try {
		const req = await axios.get('/api/weeks/' + id);
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
			...data,
			days: [
				{
					...data.days[crtDay],
					day: day.day,
					completedHours: newCH
				}
			]
		};

		await axios.post('/api/weeks/' + id, { newWeek });
		dispatch({
			type: UPDATE_CH,
			payload: [ data ]
		});
		dispatch(loadWeeks());

		dispatch(currentDay(newWeek.days[0]));
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
		console.log('err ch');
	}
};

// Add comment
export const handleAddComment = (weekId, index, day, comment) => async (dispatch) => {
	const dataReq = await axios.get('/api/weeks/' + weekId);

	console.log('index', index);
	console.log('day', day);
	// console.log(dataReq.data);
	try {
		const data = dataReq.data;
		const newWeek = {
			...data,
			days: [
				{
					day: day,
					completedHours: data.days[index].completedHours,
					tasks: [ ...data.days[index].tasks ],
					comments: [ ...data.days[index].comments, comment ]
				}
			]
		};

		if (comment == undefined || comment.length == 0) {
			invalidInputAlert();
			return false;
		}

		await axios.post('/api/weeks/' + weekId, { newWeek });
		console.log('day in add comm', index);
		dispatch({
			type: ADD_COMMENT,
			payload: [ data ]
		});

		dispatch(currentDay(newWeek.days[0]));
		dispatch(loadWeeks());
		addCommentAlert();
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

// Delete slot
export const handleDeleteSlot = (weekId, day, task) => async (dispatch) => {
	const req = await axios.get('/api/weeks/' + weekId);
	console.log(req);
	try {
		const data = req.data;
		const tasks = day.tasks;
		const index = tasks.indexOf(task);

		console.log(day);
		if (index > -1) {
			tasks.splice(index, 1);
		}

		const newWeek = {
			...data,
			days: [
				{
					...day,
					tasks: [ ...tasks ]
				}
			]
		};

		await axios.post('/api/weeks/' + weekId, { newWeek });

		dispatch({
			type: DELETE_SLOT,
			payload: [ data ]
		});

		dispatch(loadWeeks());
		dispatch(currentDay(newWeek.days[0]));
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};
// Delete comment
export const handleDeleteComment = (dayIndex, day, comment, weekId) => async (dispatch) => {
	const dataReq = await axios.get('/api/weeks/' + weekId);

	console.log('day', day);
	console.log('dayIndex', dayIndex);
	try {
		const data = dataReq.data;
		const comments = data.days[dayIndex].comments;
		const index = comments.indexOf(comment);

		if (index > -1) {
			comments.splice(index, 1);
		}

		const newWeek = {
			...data,
			days: [
				{
					day: day,
					completedHours: data.days[dayIndex].completedHours,
					tasks: [ ...data.days[dayIndex].tasks ],
					comments: [ ...comments ]
				}
			]
		};

		await axios.post('/api/weeks/' + weekId, { newWeek });

		dispatch({
			type: DELETE_COMMENT,
			payload: [ data ]
		});

		dispatch(currentDay(newWeek.days[0]));
		dispatch(loadWeeks());
		removeCommentAlert();
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};
// update comments
export const handleUpdateComment = (id, dayIndex, newComment, commentToEdit, day) => async (dispatch) => {


	// console.log('day', day);
	// console.log('dayIndex', dayIndex);

	try {
		const req = await axios.get('/api/weeks/' + id);
		const data = req.data;

		const atIndex = (element) => element == commentToEdit;
		const commentsArr = data.days[dayIndex].comments;
		// console.log(data.days[dayIndex].comments);

		const commentIndex = commentsArr.findIndex(atIndex);
		// console.log(commentToEdit);
		// console.log(commentsArr[commentIndex]);
		commentsArr[commentIndex] = newComment;

		const newWeek = {
			...data,
			days: [
				{
					day: day,
					completedHours: data.days[dayIndex].completedHours,
					tasks: [ ...data.days[dayIndex].tasks ],
					comments: [ ...commentsArr ]
				}
			]
		};

		// console.log(newWeek);

		await axios.post('/api/weeks/' + id, { newWeek });

		dispatch({
			type: UPDATE_COMMENT,
			payload: [ data ]
		});

		// console.log(data.days[dayIndex]);
		dispatch(currentDay(data.days[dayIndex]));
		dispatch(loadWeeks());
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

// Update day tasks
export const handleUpdateDay = (id, index, day, week, slotId) => async (dispatch) => {
	try {
		const req = await axios.get('/api/weeks/' + id);
		const data = req.data;
		// console.log(day.tasks[slotId].taskName);
		console.log('slotId is', slotId);
		console.log('day', day.tasks);
		console.log('day is', day.tasks[slotId]);
		// console.log('data is', data.days[index]);
		const newWeek = {
			...data,
			weekFocus: [ ...data.weekFocus ],

			days: [
				{
					day: data.days[index].day,
					completedHours: data.days[index].completedHours,
					tasks: [
						// ...data.days[index].tasks,
						...day.tasks
						// here should be day tasks
					],
					comments: [ ...data.days[index].comments ]
				}
			]
		};
		// console.log(newWeek.days[0].tasks[slotId].slotNumber);

		await axios.post('/api/weeks/' + id, { newWeek });
		console.log(newWeek);
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

export const handleAddWeekFocus = (id, day, task) => async (dispatch) => {
	try {
		const req = await axios.get('/api/weeks/' + id);
		const data = req.data;

		const newWeek = {
			...data,
			weekFocus: [
				...data.weekFocus,
				{
					task: task.taskName,
					allocatedHours: task.allocatedHours,
					completedHours: task.completedHours
				}
			]
		};

		await axios.post('/api/weeks/' + id, { newWeek });

		dispatch({
			type: ADD_WEEKFOCUS,
			payload: [ data ]
		});
		dispatch(currentWeek(newWeek));
		dispatch(loadWeeks());
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

export const handleUpdateWeekFocus = (id, weekFocus) => async (dispatch) => {
	try {
		const req = await axios.get('/api/weeks/' + id);
		const data = req.data;

		const newWeek = {
			...data,
			weekFocus: [ ...weekFocus ]
		};

		await axios.post('/api/weeks/' + id, { newWeek });

		dispatch({
			type: UPDATE_WEEKFOCUS,
			payload: [ data ]
		});

		dispatch(currentWeek(newWeek));
		dispatch(loadWeeks());
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};

export const handleDeleteWeekFocus = (id, task) => async (dispatch) => {
	try {
		const req = await axios.get('/api/weeks/' + id);
		const data = req.data;
		const weekFocus = data.weekFocus;

		const newWeek = {
			...data,
			weekFocus: []
		};
		let findTask = weekFocus.findIndex((x) => x._id === task);

		if (findTask > -1) {
			weekFocus.splice(findTask, 1);
		}

		newWeek.weekFocus = [ ...weekFocus ];

		await axios.post('/api/weeks/' + id, { newWeek });

		dispatch({
			type: DELETE_WEEKFOCUS,
			payload: [ data ]
		});

		dispatch(currentWeek(newWeek));
		dispatch(loadWeeks());
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
	}
};
