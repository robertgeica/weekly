import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleUpdateDay } from '../../actions/weeks';

const EditModal = ({ data, day, handleUpdateDay }) => {
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

	// console.log(data);
	const [ week, setWeek ] = useState({ ...data });

	const onChangeWeekFocus = (e) => {
		const { weekFocus } = week;
		console.log(weekFocus);

		const newWeek = { ...weekFocus, [e.target.name]: e.target.value };
		console.log(newWeek);
		setWeek({ ...week, weekFocus: newWeek });
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
								<th>#</th>
								<th>Task-L</th>
								<th>C/A Hours</th>
								<th>Task-P</th>
								<th>C/A Hours</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<td>Q1</td>
								<td className="text">
									<input type="text" name="learnTask1" defaultValue={week.weekFocus.learnTask1} />
								</td>
								<td className="text">
									<input
										type="text"
										name="learnHoursTask1"
										defaultValue={week.weekFocus.learnHoursTask1}
									/>
								</td>
								<td className="text">
									<input
										type="text"
										className="hour"
										name="practiceTask1"
										defaultValue={week.weekFocus.practiceTask1}
									/>
								</td>
								<td className="text">
									<input
										type="text"
										className="hour"
										name="practiceHoursTask1"
										defaultValue={week.weekFocus.practiceHoursTask1}
									/>
								</td>
							</tr>

							<tr>
								<td>Q2</td>
								<td className="text">
									<input type="text" name="learnTask2" defaultValue={week.weekFocus.learnTask2} />
								</td>
								<td className="text">
									<input
										type="text"
										name="learnHoursTask2"
										defaultValue={week.weekFocus.learnHoursTask2}
									/>
								</td>
								<td className="text">
									<input
										type="text"
										className="hour"
										name="practiceTask2"
										defaultValue={week.weekFocus.practiceTask2}
									/>
								</td>
								<td className="text">
									<input
										type="text"
										className="hour"
										name="practiceHoursTask2"
										defaultValue={week.weekFocus.practiceHoursTask2}
									/>
								</td>
							</tr>

							<tr>
								<td>Q3</td>
								<td className="text">
									<input type="text" name="learnTask3" defaultValue={week.weekFocus.learnTask3} />
								</td>
								<td className="text">
									<input
										type="text"
										name="learnHoursTask3"
										defaultValue={week.weekFocus.learnHoursTask3}
									/>
								</td>
								<td className="text">
									<input
										type="text"
										name="practiceTask3"
										className="hour"
										defaultValue={week.weekFocus.practiceTask3}
									/>
								</td>
								<td className="text">
									<input
										type="text"
										name="practiceHoursTask3"
										className="hour"
										defaultValue={week.weekFocus.practiceHoursTask3}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</form>

			<button
				onClick={() => handleUpdateDay(data._id, currentDay, dayTasks, week)}
				type="button"
				className="button"
			>
				Update{' '}
			</button>
		</div>
	);
};

EditModal.propTypes = {
	handleUpdateDay: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	data: state.weeks.currentWeek,
	day: state.weeks.currentDay
});
export default connect(mapStateToProps, { handleUpdateDay })(EditModal);
