import React, { useState } from 'react';
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

	const onChangeTasks = (e) => {
		const { tasks } = dayTasks;
		console.log(tasks);

		const newTasks = { ...tasks, [e.target.name]: e.target.value };
		setDayTasks({ ...dayTasks, tasks: newTasks });
		console.log(newTasks);
	};

	// WEEK FOCUS
	const [ week, setWeek ] = useState({ ...data });

	const [ newWF, setNewWF ] = useState({});

	const onChangeWeekFocus = (e) => {
		const { weekFocus } = week;
		// console.log(weekFocus);

		const taskName = e.target.parentNode.parentNode.childNodes[0].childNodes[0].value;
		const allocatedHours = e.target.parentNode.parentNode.childNodes[1].childNodes[0].value;
		const completedHours = e.target.parentNode.parentNode.childNodes[2].childNodes[0].value;

		let findTask = weekFocus.findIndex(x => (x._id === e.target.id));

		const newWeek = [...weekFocus];
		
		if(findTask == -1) {findTask = newWeek.length -1};
		newWeek[findTask].task = taskName;
		newWeek[findTask].allocatedHours = allocatedHours;
		newWeek[findTask].completedHours = completedHours;

		setNewWF(newWeek);


	};

	return (
		<div className="modal-body">
			<form onChange={onChangeTasks}>
				<div className="day-focus">
					<span>Today Focus</span>

					<table>
						<thead>
							<tr>
								<th>hour-1</th>
								<th>hour-2</th>
								<th>hour-3</th>
								<th>hour-4</th>
								<th>hour-5</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="text">
									<input type="text" name="h1" defaultValue={day.tasks.h1} />
								</td>
								<td className="text">
									<input type="text" name="h2" defaultValue={day.tasks.h2} />
								</td>
								<td className="text">
									<input type="text" name="h3" defaultValue={day.tasks.h3} />
								</td>
								<td className="text">
									<input type="text" name="h4" defaultValue={day.tasks.h4} />
								</td>
								<td className="text">
									<input type="text" name="h5" defaultValue={day.tasks.h5} />
								</td>
							</tr>
						</tbody>
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
									<td>
										<input type="text" name="task" id={task._id} defaultValue={task.task} />
									</td>

									<td>
										<input
											type="text"
											name="allocatedHours"
											id={task._id}
											defaultValue={task.allocatedHours}
										/>
									</td>

									<td>
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
					handleUpdateDay(data._id, currentDay, dayTasks, week);
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
