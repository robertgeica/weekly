import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

import { handleUpdateDay, handleUpdateWeekFocus } from '../../actions/weeks';

const EditModal = ({ data, day, handleUpdateDay, handleUpdateWeekFocus }) => {
	const dayId = day.day;
	const currentDay = dayId % 7 == 0 ? 6 : dayId % 7 - 1;

	const [ dayTasks, setDayTasks ] = useState({
		...day
	});
	const [ slotId, setSlotId ] = useState(0);

	const onChangeTasks = (e) => {
		// console.log('slot id', e.target.id);
		setSlotId(parseInt(e.target.id));
		// console.log(dayTasks);
		const { tasks } = dayTasks;

		const objIndex = tasks.findIndex((task) => task.slotNumber == parseInt(e.target.id));
		const updatedObj = { ...tasks[objIndex], [e.target.name]: e.target.value };
		const updatedTasks = [ ...tasks.slice(0, objIndex), updatedObj, ...tasks.slice(objIndex + 1) ];

		setDayTasks({ ...dayTasks, tasks: updatedTasks });
	};
	// WEEK FOCUS
	const [ week, setWeek ] = useState({ ...data });

	const [ newWF, setNewWF ] = useState({});

	const onChangeWeekFocus = (e) => {
		const { weekFocus } = week;

		const taskName = e.target.parentNode.parentNode.childNodes[0].childNodes[0].value;
		const allocatedHours = e.target.parentNode.parentNode.childNodes[1].childNodes[0].value;
		const completedHours = e.target.parentNode.parentNode.childNodes[2].childNodes[0].value;

		let findTask = weekFocus.findIndex((x) => x._id === e.target.id);

		const newWeek = [ ...weekFocus ];

		if (findTask == -1) {
			findTask = newWeek.length - 1;
		}
		newWeek[findTask].task = taskName;
		newWeek[findTask].allocatedHours = allocatedHours;
		newWeek[findTask].completedHours = completedHours;

		setNewWF(newWeek);
	};

	// console.log(slotId);
	return (
		<div className="modal-body">
			<form onChange={onChangeTasks}>
				<div className="day-focus">
					<span>Today Focus</span>

					<table>
						<Fragment>
							<thead>
								<tr>{day.tasks.map((task) => <th key={task._id}>Slot {task.slotNumber}</th>)}</tr>
							</thead>
							<tbody>
								<tr>
									{day.tasks.map((task) => (
										<td key={task._id} className="text">
											<input
												type="text"
												name="taskName"
												defaultValue={day.tasks[task.slotNumber].taskName}
												id={task.slotNumber}
											/>
										</td>
									))}
								</tr>
							</tbody>
						</Fragment>
					</table>
				</div>
			</form>

			<form onChange={onChangeWeekFocus}>
				<div className="week-focus">
					<span>Week Focus</span>

					<table>
						<thead>
							<tr>
								<th>Task</th>
								<th>Allocated Hours</th>
								<th>Completed Hours</th>
							</tr>
						</thead>

						<tbody>
							{data.weekFocus.map((task) => (
								<tr key={task._id}>
									<td className="text">
										<input type="text" name="task" id={task._id} defaultValue={task.task} />
									</td>

									<td className="text">
										<input
											type="text"
											name="allocatedHours"
											id={task._id}
											defaultValue={task.allocatedHours}
										/>
									</td>

									<td className="text">
										<input
											type="text"
											name="completedHours"
											id={task._id}
											defaultValue={task.completedHours}
										/>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</form>

			<button
				onClick={() => {
					handleUpdateDay(data._id, currentDay, dayTasks, week, slotId);
					handleUpdateWeekFocus(data._id, newWF);
				}}
				type="button"
				className="button"
			>
				Update{' '}
			</button>
		</div>
	);
};

EditModal.propTypes = {
	handleUpdateDay: PropTypes.func.isRequired,
	handleUpdateWeekFocus: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	data: state.weeks.currentWeek,
	day: state.weeks.currentDay
});
export default connect(mapStateToProps, { handleUpdateDay, handleUpdateWeekFocus })(EditModal);
