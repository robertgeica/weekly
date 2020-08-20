import React, { useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import { uuid } from 'uuidv4';

import { connect } from 'react-redux';
import store from '../../store/store';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {
	loadRoadmaps,
	updateRoadmaps,
	currentCategory,
	handleOpenModal,
	handleDeleteTask,
	handleOpenUpdateModal,
	setTaskId,
	setCurrentTask
} from '../../actions/roadmap';

import AddRoadmapModal from './AddRoadmapModal';
import UpdateTaskModal from './UpdateTaskModal';

const Roadmap = ({ auth: { isAuthenticated, loading }, data, crtCategory, taskId }) => {
	useEffect(() => {
		store.dispatch(loadRoadmaps());
		// store.dispatch(updateRoadmaps());
	}, []);

	// get all categories
	let categories = [];
	data.map((task) => {
		categories.push(task.categoryName);
	});

	// remove duplicates from categories array
	categories = [ ...new Set(categories) ];

	// redirect to /login if user is not authenticated
	if(!loading && !isAuthenticated) {
		return <Redirect to="/login" />	
	}

	return (
		<div className="roadmap">
			<h2>Roadmap</h2>
			<h3>#{crtCategory}</h3>

			<div className="roadmap-navbar">
				<div className="buttons">
					{categories.map((c) => (
						<Fragment key={uuid()}>
							<span>#</span>
							<button
								className="btn-category"
								key={uuid()}
								onClick={(e) => store.dispatch(currentCategory(e.target.textContent))}
							>
								{c}
							</button>
						</Fragment>
					))}
				</div>
			</div>

			<div className="tasks-list">
				<div className="addtask-button-container">
					<button className="button2" onClick={() => store.dispatch(handleOpenModal())}>
						Add task
					</button>
				</div>

				<AddRoadmapModal />

				{data.map((task) => {
					if (task.categoryName == crtCategory) {
						store.dispatch(setCurrentTask(task));

						return (
							<div key={task._id} className="task">
								<div className="task-info">
									<p>Task: {task.task.name}</p>

									<div className="hours">
										<p>AH: {task.task.allocatedHours}</p>
										<p>CH: {task.task.completedHours}</p>

										<UpdateTaskModal />
									</div>
								</div>

								<div className="buttons">
									<button
										className="button"
										onClick={() => store.dispatch(handleDeleteTask(task._id))}
									>
										<FontAwesomeIcon icon={faTrashAlt} />
									</button>

									<button
										className="button"
										onClick={() => {
											store.dispatch(handleOpenUpdateModal());
											store.dispatch(setTaskId(task._id));
										}}
									>
										<FontAwesomeIcon icon={faPen} />
									</button>
								</div>
							</div>
						);
					}
				})}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	data: state.roadmap.data,
	crtCategory: state.roadmap.currentCategory,
	taskId: state.roadmap.taskId,
	auth: state.auth
});

export default connect(mapStateToProps)(Roadmap);
