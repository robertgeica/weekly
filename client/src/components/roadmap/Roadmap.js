import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import { uuid } from 'uuidv4';

import { connect } from 'react-redux';
import store from '../../store/store';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import ChatIcon from '@material-ui/icons/Chat';
import EventIcon from '@material-ui/icons/Event';

import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import RocketIcon from '../../assets/rocket.svg';

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

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';

const Roadmap = ({ auth: { isAuthenticated, loading }, data, crtCategory, taskId, currentTask }) => {
	useEffect(() => {
		store.dispatch(loadRoadmaps());
		// store.dispatch(updateRoadmaps());
	}, []);
	// options for delete/edit
	const [ anchorEl, setAnchorEl ] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (e) => {
		setAnchorEl(e.currentTarget);
		store.dispatch(setTaskId(e.target.parentNode.parentNode.parentNode.parentNode.id));
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// drawer right
	const classes = useStyles();
	const [ open2, setOpen ] = React.useState(false);

	const handleDrawerOpen = (e) => {
		setOpen(true);
		store.dispatch(setTaskId(e.target.parentNode.parentNode.id));
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};
	// end drawer

	// get all categories
	let categories = [];
	data.map((task) => {
		categories.push(task.categoryName);
	});

	// remove duplicates from categories array
	categories = [ ...new Set(categories) ];

	// redirect to /login if user is not authenticated
	if (!loading && !isAuthenticated) {
		return <Redirect to="/login" />;
	}

	console.log(currentTask);

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
					<button className="button2"> Add label </button>
				</div>

				<AddRoadmapModal />

				<div className={open2 == true ? 'tasks-container opened-drawer' : 'tasks-container'}>
					{data.map((task) => {
						if (task.categoryName == crtCategory) {
							if (taskId == task._id) {
								store.dispatch(setCurrentTask(task));
							}

							const editOptions = [
								<div className="buttons">
									<button
										className="button"
										onClick={() => {
											store.dispatch(handleDeleteTask(taskId));
											handleClose();
										}}
									>
										<DeleteForeverIcon />
									</button>

									<button
										className="button"
										onClick={() => {
											store.dispatch(handleOpenUpdateModal());
											handleClose();
										}}
									>
										<EditIcon />
									</button>
								</div>
							];

							return (
								<div key={task._id} className="task" id={task._id}>
									<div className="task-img" onClick={handleDrawerOpen}>
										<img src={RocketIcon} alt="Logo" />
									</div>

									<Drawer
										className="drawer"
										className={classes.drawer}
										variant="persistent"
										anchor="right"
										open={open2}
										classes={{
											paper: classes.drawerPaper
										}}
									>
										<div>
											<p onClick={handleDrawerClose}>close</p>
										</div>
										<Divider />
										{Object.keys(currentTask).length == 0 ? (
											''
										) : (
											<div>
												<p>{currentTask.task.name}</p>
												<p>{currentTask.categoryName}</p>

												<div className="stats">
													<div className="icon">
														<QueryBuilderIcon />
														<span>20</span>
													</div>
													<div className="icon">
														<ChatIcon />
														<span>8</span>
													</div>
													<div className="due-icon">
														<EventIcon />
														<span>20 days</span>
													</div>
												</div>

												<p>comments</p>
												<Divider />

												<p>activity</p>
												<Divider />
											</div>
										)}
									</Drawer>

									<div className="icon-btn">
										<IconButton
											aria-label="more"
											aria-controls="long-menu"
											aria-haspopup="true"
											onClick={handleClick}
										>
											<MoreVertIcon />
										</IconButton>

										<Menu
											id="long-menu"
											anchorEl={anchorEl}
											keepMounted
											open={open}
											onClose={handleClose}
											PaperProps={{
												style: {
													width: 'auto',
													height: 'auto'
												}
											}}
										>
											{editOptions.map((option) => <MenuItem key={task._id}>{option}</MenuItem>)}
										</Menu>
									</div>

									<div className="task-info">
										<div className="infos">
											<p>{task.task.name}</p>
											<p>{task.categoryName}</p>
										</div>
										{Object.keys(currentTask).length == 0 ? '' : <UpdateTaskModal />}
									</div>

									<div className="progress-bar">
										<p>80%</p>
										<BorderLinearProgress variant="determinate" value={80} />
									</div>

									<div className="stats">
										<div className="icon">
											<QueryBuilderIcon />
											<span>20</span>
										</div>
										<div className="icon">
											<ChatIcon />
											<span>8</span>
										</div>
										<div className="due-icon">
											<EventIcon />
											<span>20 days</span>
										</div>
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	data: state.roadmap.data,
	crtCategory: state.roadmap.currentCategory,
	taskId: state.roadmap.taskId,
	auth: state.auth,
	currentTask: state.roadmap.currentTask
});

const BorderLinearProgress = withStyles((theme) => ({
	root: {
		height: 10,
		borderRadius: 5
	},
	colorPrimary: {
		backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
	},
	bar: {
		borderRadius: 5,
		backgroundColor: '#1a90ff'
	}
}))(LinearProgress);

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	appBar: {
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'margin', 'width' ], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginRight: drawerWidth
	},
	title: {
		flexGrow: 1
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0
	},
	drawerPaper: {
		width: drawerWidth
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-start'
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		marginRight: -drawerWidth
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen
		}),
		marginRight: 0
	}
}));

export default connect(mapStateToProps)(Roadmap);
