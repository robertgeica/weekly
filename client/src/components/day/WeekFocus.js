import React, { useState } from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { handleAddWeekFocus, handleDeleteWeekFocus } from '../../actions/weeks';

const WeekFocus = ({ data, day, handleAddWeekFocus, handleDeleteWeekFocus }) => {
	const [ toggle, setToggle ] = useState(undefined);
	const [ task, setTask ] = useState({});

	const handleCloseModal = () => {
		setToggle(false);
	};

	const handleOpenModal = () => {
		setToggle(true);
	};

	const onChange = e => {
		const taskName = e.target.parentNode.childNodes[0].value;
		const allocatedHours = e.target.parentNode.childNodes[1].value;
		const completedHours = e.target.parentNode.childNodes[2].value;

		const newTask = {
			taskName,
			allocatedHours,
			completedHours
		};

		setTask(newTask);
	
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
				<form onChange={onChange}>
					<input type="text" name="name" placeholder="task name" />
					<input type="text" name="allocatedHours" placeholder="allocated hours" />
					<input type="text" name="completedHours" placeholder="completed hours" />
				</form>

				<button 
					className="add-task" 
					onClick={() => {handleAddWeekFocus(data._id, day, task); handleCloseModal();}}
				>
					Add Task
				</button>

			</Modal>
			<button onClick={handleOpenModal}>Add new task</button>

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
								<FontAwesomeIcon icon={faTrashAlt} />
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
	handleDeleteWeekFocus: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	data: state.weeks.currentWeek,
	day: state.weeks.currentDay
});

export default connect(mapStateToProps, { handleAddWeekFocus, handleDeleteWeekFocus })(WeekFocus);
