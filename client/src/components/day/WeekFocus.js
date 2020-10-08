import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


import { connect } from 'react-redux';
import store from '../../store/store';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { handleAddWeekFocus, handleDeleteWeekFocus } from '../../actions/weeks';
import { loadRoadmaps } from '../../actions/roadmap';

const WeekFocus = ({ data, day, roadmap, handleAddWeekFocus, handleDeleteWeekFocus }) => {

	// console.log(data); //data.weekFocus[].completedHours if task ==
	// console.log(day);
	// console.log(roadmap); //roadmap[].task.completedHours if name ==
	useEffect(() => {
		store.dispatch(loadRoadmaps());
	}, []);

	const [ toggle, setToggle ] = useState(undefined);
	const [ task, setTask ] = useState({});

	const handleCloseModal = () => {
		setToggle(false);
	};

	const handleOpenModal = () => {
		setToggle(true);
	};

	const handleChange = text => e => {

		if(text == 'taskName' && e.target.value == 0 || e.target.value == undefined) {
			setTask({...task, [text]: e.target.textContent});
		} else {
			setTask({...task, [text]: e.target.value});
		}
			
	}

	return (
		<div className="week-focus">
			
			<span>Week Focus</span>
			<Modal
				isOpen={!!toggle}
				onRequestClose={handleCloseModal}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="addroadmap-modal modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form>
					<Autocomplete
						freeSolo
						options={roadmap}
						getOptionLabel={(option) => option.task.name}
						onChange={handleChange('taskName')}
						renderInput={
							(params) => <TextField {...params} label="Task" onChange={handleChange('taskName')} />
						}
					/>

					<input type="text" name="allocatedHours" placeholder="allocated hours" onChange={handleChange('allocatedHours')}  />
					<input type="text" name="completedHours" placeholder="completed hours" onChange={handleChange('completedHours')}  />
				</form>

				<button 
					className="button" 
					onClick={() => {handleAddWeekFocus(data._id, day, task); handleCloseModal();}}
				>
					Add Task
				</button>

			</Modal>
			<button className="button" onClick={handleOpenModal}>Add new task</button>

			<table>
				<thead>
					<tr>
						<th>Task</th>
						<th>Allocated Hours</th>
						<th>Completed Hours</th>
						<th>Delete</th>
					</tr>
				</thead>

				<tbody>
					{data.weekFocus.map((task) => (
						<tr key={uuid()}>
							<td id={task._id}>{task.task}</td>
							<td id={task._id}>{task.allocatedHours}</td>
							<td id={task._id}>{task.completedHours}</td>
							<td
								className="delete"
								onClick={(e) => {
									e.preventDefault();
									handleDeleteWeekFocus(data._id, e.target.parentNode.childNodes[0].id);
								}}
							>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

WeekFocus.propTypes = {
	handleAddWeekFocus: PropTypes.func.isRequired,
	handleDeleteWeekFocus: PropTypes.func.isRequired,
	loadRoadmaps: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	data: state.weeks.currentWeek,
	day: state.weeks.currentDay,
	roadmap: state.roadmap.data
});

export default connect(mapStateToProps, { handleAddWeekFocus, handleDeleteWeekFocus, loadRoadmaps })(WeekFocus);
