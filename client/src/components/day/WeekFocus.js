import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { handleAddWeekFocus, handleDeleteWeekFocus } from '../../actions/weeks';

const WeekFocus = ({ data, day, handleAddWeekFocus, handleDeleteWeekFocus }) => {
	return (
		<div className="week-focus">
			<span>Week Focus</span>
			<button onClick={() => handleAddWeekFocus(data._id, day)}>Add Task</button>

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
