import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uuid } from 'uuidv4';

import {handleAddWeekFocus} from '../../actions/weeks';

const WeekFocus = ({ data, handleAddWeekFocus }) => {
	return (
		<div className="week-focus">
			<span>Week Focus</span>
			<button onClick={() => handleAddWeekFocus(data._id)}>Add WeekFocus</button>

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
						<tr key={uuid()}>
							<td>{task.task}</td>
							<td>{task.allocatedHours}</td>
							<td>{task.completedHours}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

WeekFocus.propTypes = {
	handleAddWeekFocus: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
	data: state.weeks.currentWeek
});

export default connect(mapStateToProps, { handleAddWeekFocus })(WeekFocus);
