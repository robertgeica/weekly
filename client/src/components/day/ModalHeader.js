import React, { useState, useEffect } from 'react';
import { connect, Provider } from 'react-redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import {
	loadWeeks,
	currentWeek,
	currentDay,
	handleCloseModal,
	handleDeleteWeek,
	handleUpdateCH
} from '../../actions/weeks';
import { selectWeeks, selectWeek, selectDay, toggle } from '../../selectors/week.selectors';

import store from '../../store/store';

const ModalHeader = ({
	state,
	data,
	day,
	ch,
	handleDeleteWeek,
	handleUpdateCH,
	handleCloseModal,
	loadDay
}) => {
	useEffect(() => {
		store.dispatch(loadWeeks());
	}, []);

	const id = data._id;

	const toggleM = toggle();

	return (
		<div className="modal-header">
			<div className="buttons">
				<button className="icon" onClick={handleCloseModal}>
					<FontAwesomeIcon icon={faTimes} />
				</button>

				<button className="icon" >
					<FontAwesomeIcon icon={faPen} />
				</button>

				<button className="icon" onClick={() => handleDeleteWeek(id)}>
					<FontAwesomeIcon icon={faTrashAlt} />
				</button>
			</div>

			<div className="modal-info">
				<p>Day: {day.day}</p>
				<p>Week: {data.week}</p>
				<p>CH: {ch}</p>
				<div className="updateCH-container">
					<button onClick={(e) => handleUpdateCH(id, e.target.textContent, day)}>+</button>
					<button onClick={(e) => handleUpdateCH(id, e.target.textContent, day)}>-</button>
				</div>
			</div>
		</div>
	);
};

ModalHeader.propTypes = {
	handleDeleteWeek: PropTypes.func.isRequired,
	handleUpdateCH: PropTypes.func.isRequired,
	toggleModal: PropTypes.bool,
	toggleEditModal: PropTypes.bool
};

const mapStateToProps = (state) => ({
	ch: state.weeks.currentDay.completedHours,
	data: state.weeks.currentWeek,
	day: state.weeks.currentDay,
	state: state.weeks.data
});
export default connect(mapStateToProps, { handleDeleteWeek, handleUpdateCH, handleCloseModal })(
	ModalHeader
);
