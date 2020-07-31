import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import store from '../../store/store';

import { loadWeeks, currentWeek, currentDay, handleOpenModal, handleCloseModal } from '../../actions/weeks';
import { selectDay } from '../../selectors/week.selectors';

import AddWeek from './AddWeek';
import DayModal from '../day/DayModal';

const Weeks = ({ auth: {isAuthenticated, loading }, state }) => {

	useEffect(() => {
		store.dispatch(loadWeeks());
	}, []);

	const sortWeeks = (a, b) => {
		let compare = 0;
		if(a.week > b.week) { compare = 1 }
		else if(a.week < b.week) { compare = -1 }
		return compare;
	}
	state.sort(sortWeeks);

	const completeStatus = (x) => {
		if (x === 0 || x === undefined) return 'day';
		if (x === 1) return 'c25 day';
		if (x === 2) return 'c50 day';
		if (x === 3) return 'c75 day';
		if (x === 4) return 'c100 day';
		if (x > 1) return 'c101 day';
	};

	const crtDay = selectDay();

	if(loading == false && isAuthenticated == false) {
		return <Redirect to="/login" />	
	}

	return (
		<div className="weeks-container">
			<AddWeek />
			
			{state.map((week) => {
				return (
					<div key={week._id} className="week-row">
						{week.days.map((day) => (
							<div key={day.day} className={completeStatus(day.completedHours)}>
								{ day.day == crtDay.day ? <DayModal /> : '' }

								<div
									onClick={(e) => {
										store.dispatch(handleOpenModal());
										store.dispatch(currentDay(day));
										store.dispatch(currentWeek(week));
									}}
									className="cell"
									id={day.day}
									key={day.day}
								>
									<span id={day.day} className="dayinfo-container">
										<span id={day.day} className="span-day">
											Day {day.day}
										</span>

										<span id={day.day} className="span-day">
											Week {week.week}
										</span>
									</span>
								</div>
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
};

const mapStateToProps = (state) => ({
	currentWeek: state.weeks.currentWeek,
	currentDay: state.weeks.currentDay,
	toggleModal: state.weeks.toggleModal,
	state: state.weeks.data,
	auth: state.auth
});



export default connect(mapStateToProps, { currentWeek, currentDay, handleOpenModal, handleCloseModal })(Weeks);
