import React from 'react';

import { connect } from 'react-redux';

const DayFocus = ({ day }) => {
	const h1 = day.tasks.h1;
	const h2 = day.tasks.h2;
	const h3 = day.tasks.h3;
	const h4 = day.tasks.h4;
	const h5 = day.tasks.h5;

	return (
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
						<td className={h1 === '' ? 'incomplete' : 'green'}>{h1}</td>
						<td className={h2 === '' ? 'incomplete' : 'green'}>{h2}</td>
						<td className={h3 === '' ? 'incomplete' : 'green'}>{h3}</td>
						<td className={h4 === '' ? 'incomplete' : 'green'}>{h4}</td>
						<td className={h5 === '' ? 'incomplete' : 'green'}>{h5 === undefined ? '-' : h5}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

const mapStateToProps = (state) => ({
	day: state.weeks.currentDay
});
export default connect(mapStateToProps, {})(DayFocus);
