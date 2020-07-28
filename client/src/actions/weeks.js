import axios from 'axios';
import { DATA_LOADED, DATA_ERROR, ADD_WEEK, DELETE_WEEK, CURRENT_WEEK, CURRENT_DAY, TOGGLE_MODAL } from './types';

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

// Add new week
export const handleAddWeek = () => async (dispatch) => {
	console.log('add week action dispatched');

	try {
		const data = await axios.get('http://localhost:4000/weeks');
		let weekToAdd = 1;
		const arr = [];
		console.log(data.data);

		data.data.map((week) => {
			console.log('added week', weekToAdd);
			arr.push(week.week);

			const [ min, max ] = [ Math.min(...arr), Math.max(...arr) ];
			const missingWeek = Array.from(Array(max - min), (v, i) => i + min).filter((i) => !arr.includes(i));

			console.log('missing week', missingWeek);

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
	} catch (error) {
		dispatch({
			type: DATA_ERROR
		});
		console.log('error adding new wk');
	}
};
