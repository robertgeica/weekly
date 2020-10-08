import React, { useState, useEffect, Fragment } from 'react';
import Modal from 'react-modal';
import { uuid } from 'uuidv4';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import store from '../../store/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { handleAddSlot, handleDeleteSlot } from '../../actions/weeks';
import { loadRoadmaps, handleAddTask } from '../../actions/roadmap';

const DayFocus = ({ day, week, roadmap }) => {
	const [ slotTask, setSlotTask ] = useState('');
	const [ toggleModal, setToggleModal ] = useState(undefined);
	const [ newRoadmapTask, setNewRoadmapTask ] = useState({});
	useEffect(() => {
		store.dispatch(loadRoadmaps());
	}, []);



	const handleChange = (e) => {

		setSlotTask(e.target.value || e.target.textContent);

		// create a list of all tasks in roadmap
		let roadmapTasksArr = [];
		// console.log(roadmap);
		roadmap.map(taskName => {
			roadmapTasksArr.push(taskName.task.name);
		});

		// create the new roadmap task
		const newTask = {
			categoryName: 'uncategorized',
			task: {
				name: e.target.value || e.target.textContent,
				allocatedHours: 0,
				completedHours: 0
			}
		};

		// check if roadmap task already exists
		roadmapTasksArr.includes(e.target.value || e.target.textContent) ?
		setNewRoadmapTask({}) :
		setNewRoadmapTask(newTask);

	};

	const handleOpenModal = () => {
		setToggleModal(true);
	};

	const handleCloseModal = () => {
		setToggleModal(false);
	};

	console.log(newRoadmapTask);
	// console.log(week);
	// console.log(day);
	return (
		<div className="day-focus">
			<span>Today Focus</span>
			<button className="button" onClick={handleOpenModal}>
				{' '}
				Add slot{' '}
			</button>

			<Modal
				isOpen={toggleModal}
				onRequestClose={handleCloseModal}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="addroadmap-modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form >
					<Autocomplete
						freeSolo
						options={roadmap}
						getOptionLabel={(option) => option.task.name}
						onChange={handleChange}
						renderInput={
							(params) => <TextField onChange={handleChange} {...params} label="Task" />
						}
					/>
				</form>

				<button
					className="button"
					onClick={() => {
						store.dispatch(handleAddSlot(week._id, day.day, slotTask));
						handleCloseModal();

						// if no new roadmap task, don't add a new one
						(JSON.stringify(newRoadmapTask) === '{}') ? 
						console.log(null) :
						store.dispatch(handleAddTask(newRoadmapTask));

					}}
				>
					{' '}
					Add{' '}
				</button>
			</Modal>

			<table>
				<Fragment>
					<thead>
						<tr>
							{day.tasks.map((task) => (
									<th key={uuid()}>Slot {task.slotNumber}</th>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							{day.tasks.map((task) => (
								<td key={uuid()} className={task.taskName === '' ? 'incomplete' : 'green'}>
									{task.taskName}
								</td>
							))}
						</tr>

						<tr>
							{day.tasks.map((task) => (
								<td key={uuid()}>
									<FontAwesomeIcon
										onClick={() => store.dispatch(handleDeleteSlot(week._id, day, task))}
										icon={faTrashAlt}
										className="delete-slot"
									/>
								</td>
							))}
						</tr>
					</tbody>
				</Fragment>
			</table>
		</div>
	);
};

DayFocus.propTypes = {
	loadRoadmaps: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => ({
	day: state.weeks.currentDay,
	week: state.weeks.currentWeek,
	roadmap: state.roadmap.data
});
export default connect(mapStateToProps, {loadRoadmaps})(DayFocus);
