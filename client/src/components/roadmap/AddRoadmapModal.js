import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import { uuid } from 'uuidv4';

import { connect } from 'react-redux';
import store from '../../store/store';

import { loadRoadmaps, currentCategory, handleCloseModal, handleAddTask } from '../../actions/roadmap';

const AddRoadmapModal = ({ toggleAddTaskModal, handleCloseModal, handleAddTask, crtCategory }) => {
	const [ task, setTask ] = useState({});

	const onChange = (e) => {
		const name = e.target.parentNode.childNodes[0].value;
		const allocatedHours = e.target.parentNode.childNodes[1].value;
		const completedHours = e.target.parentNode.childNodes[2].value;
		const categoryName = e.target.parentNode.childNodes[3].value;

		const newTask = {
			categoryName,
			task: {
				name,
				allocatedHours,
				completedHours
			}
		};

		setTask(newTask);
	};

	return (
		<Modal
			isOpen={!!toggleAddTaskModal}
			onRequestClose={handleCloseModal}
			ariaHideApp={false}
			closeTimeoutMS={200}
			className="addroadmap-modal"
			style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
		>
			<form onChange={onChange}>
				<input type="text" name="name" placeholder="task name" />
				<input type="text" name="allocatedHours" placeholder="allocated hours" />
				<input type="text" name="completedHours" placeholder="completed hours" />
				<input type="text" name="categoryName" defaultValue={crtCategory} placeholder="category name" />
			</form>
			<button className="add-task" onClick={() => handleAddTask(task)}>
				{' '}
				Add{' '}
			</button>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	data: state.roadmap.data,
	crtCategory: state.roadmap.currentCategory,
	toggleAddTaskModal: state.roadmap.toggleAddTaskModal
});

export default connect(mapStateToProps, { handleCloseModal, handleAddTask })(AddRoadmapModal);
