import React from 'react';
import { connect } from 'react-redux';

const WeekFocus = ({ data }) => {
	return (
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
						<td>{data.weekFocus.learnTask1}</td>
						<td>{data.weekFocus.learnHoursTask1}</td>
						<td>{data.weekFocus.practiceTask1}</td>
						<td>{data.weekFocus.practiceHoursTask1}</td>
					</tr>

					<tr>
						<td>Q2</td>
						<td>{data.weekFocus.learnTask2}</td>
						<td>{data.weekFocus.learnHoursTask2}</td>
						<td>{data.weekFocus.practiceTask2}</td>
						<td>{data.weekFocus.practiceHoursTask2}</td>
					</tr>

					<tr>
						<td>Q3</td>
						<td>{data.weekFocus.learnTask3}</td>
						<td>{data.weekFocus.learnHoursTask3}</td>
						<td>{data.weekFocus.practiceTask3}</td>
						<td>{data.weekFocus.practiceHoursTask3}</td>
					</tr>

					{data.weekFocus.learnTask4 === undefined ? (
						false
					) : (
						<tr>
							<td>Q4</td>
							<td>{data.weekFocus.learnTask4}</td>
							<td>{data.weekFocus.learnHoursTask4}</td>
							<td>{data.weekFocus.practiceTask4}</td>
							<td>{data.weekFocus.practiceHoursTask4}</td>
						</tr>
					)}

					{data.weekFocus.learnTask5 === undefined ? (
						false
					) : (
						<tr>
							<td>Q5</td>
							<td>{data.weekFocus.learnTask5}</td>
							<td>{data.weekFocus.learnHoursTask5}</td>
							<td>{data.weekFocus.practiceTask5}</td>
							<td>{data.weekFocus.practiceHoursTask5}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = (state) => ({
	data: state.weeks.currentWeek
});

export default connect(mapStateToProps, {})(WeekFocus);
