import React, { useState, Fragment } from 'react';
import Modal from 'react-modal';

import { connect } from 'react-redux';
import store from '../../store/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { handleAddSlot, handleDeleteSlot } from '../../actions/weeks';

const DayFocus = ({ day, week }) => {
	const [ slotTask, setSlotTask ] = useState('');
	const [ toggleModal, setToggleModal ] = useState(undefined);

	const onChange = (e) => {
		setSlotTask(e.target.value);
	};

	const handleOpenModal = () => {
		setToggleModal(true);
	};

	const handleCloseModal = () => {
		setToggleModal(false);
	};

	// console.log(slotTask);

	console.log(week);
	console.log(day);
	return (
		<div className="day-focus">
			<span>Today Focus</span>
			<button className="button" onClick={handleOpenModal}>
				{' '}
				Add slot{' '}
			</button>

			<Modal
				isOpen={toggleModal}
				onRequestClose={handleCloseModal}
				ariaHideApp={false}
				closeTimeoutMS={200}
				className="addroadmap-modal"
				style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
			>
				<form onChange={onChange}>
					<input type="text" name="name" placeholder="task name" />
				</form>

				<button
					className="button"
					onClick={() => {
						store.dispatch(handleAddSlot(week._id, day.day, slotTask));
						handleCloseModal();
					}}
				>
					{' '}
					Add{' '}
				</button>
			</Modal>

			<table>
				<Fragment>
					<thead>
						<tr>
							{day.tasks.map((task) => (
								<Fragment>
									<th key={task._id}>Slot {task.slotNumber}</th>
								</Fragment>
							))}
						</tr>
					</thead>
					<tbody>
						<tr>
							{day.tasks.map((task) => (
								<td key={task._id} className={task.taskName === '' ? 'incomplete' : 'green'}>
									{task.taskName}
								</td>
							))}
						</tr>

						<tr>
							{day.tasks.map((task) => (
								<td>
									<FontAwesomeIcon
										onClick={() => store.dispatch(handleDeleteSlot(week._id, day, task))}
										icon={faTrashAlt}
										className="delete-slot"
									/>
								</td>
							))}
						</tr>
					</tbody>
				</Fragment>
			</table>
		</div>
	);
};

const mapStateToProps = (state) => ({
	day: state.weeks.currentDay,
	week: state.weeks.currentWeek
});
export default connect(mapStateToProps, {})(DayFocus);
