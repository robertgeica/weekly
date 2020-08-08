import React, { useEffect, useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';

import { uuid } from 'uuidv4';

import { connect } from 'react-redux';
import store from '../../store/store';

import { handleCloseUpdateModal, loadRoadmaps, currentCategory, handleUpdateTask } from '../../actions/roadmap';

const UpdateTaskModal = ({ toggleUpdateTaskModal, taskId, data, currentTask }) => {
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
			isOpen={!!toggleUpdateTaskModal}
			onRequestClose={() => store.dispatch(handleCloseUpdateModal())}
			ariaHideApp={false}
			closeTimeoutMS={200}
			className="updatetask-modal"
			style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
		>
			<form onChange={onChange}>
				<input type="text" defaultValue={currentTask.task.name} name="name" placeholder="task name" />
				<input
					type="text"
					defaultValue={currentTask.task.allocatedHours}
					name="allocatedHours"
					placeholder="allocated hours"
				/>
				<input
					type="text"
					defaultValue={currentTask.task.completedHours}
					name="completedHours"
					placeholder="completed hours"
				/>
				<input
					type="text"
					defaultValue={currentTask.categoryName}
					name="categoryName"
					placeholder="category name"
				/>
			</form>

			<button onClick={() => store.dispatch(handleUpdateTask(taskId, task))}>Update</button>
		</Modal>
	);
};

const mapStateToProps = (state) => ({
	data: state.roadmap.data,
	toggleUpdateTaskModal: state.roadmap.toggleUpdateTaskModal,
	taskId: state.roadmap.taskId,
	currentTask: state.roadmap.currentTask
});

export default connect(mapStateToProps)(UpdateTaskModal);
