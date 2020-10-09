import React, { useState } from 'react';
import Modal from 'react-modal';

import { uuid } from 'uuidv4';
import { format } from 'date-fns';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleAddComment, handleDeleteComment, handleUpdateComment } from '../../actions/weeks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const DayComments = ({ data, day, handleAddComment, handleDeleteComment, handleUpdateComment }) => {
	const dayId = day.day;
	const currentDay = dayId % 7 == 0 ? 6 : dayId % 7 - 1;

	const [ comment, setComment ] = useState({});
	const [ toggle, setToggle ] = useState(undefined);
	const [ commentToEdit, setCommentToEdit ] = useState();

	const handleOpenModal = () => setToggle(true);
	const handleCloseModal = () => setToggle(false);

	const onChange = (e) => setComment({comment: e.target.value, date: Date.now()});

	const checkText = (e) => {
		const t1 = e.target.parentNode.parentNode.childNodes[0];
		const t2 = e.target.parentNode.parentNode.parentNode.childNodes[0];

		// console.log(t1);
		// console.log(t2);
		console.log(t1);
		console.log(t2);
		if(t1.className === 'com') setCommentToEdit(t1.textContent);
		if(t2.className === 'com') setCommentToEdit(t2.textContent);
	};


	const [ toggleVis, setToggleVis ] = useState(true);

	const handleContainerVisibility = () => {
		setToggleVis(!toggleVis);
	};

	return (
		<div className="day-comments">
			<div className="section-title">
				<span>Comments</span>
				
				<input 
					name="visibility"
					className="visibility-checkbox"
					type="checkbox" 
					onChange={handleContainerVisibility} checked={toggleVis} 
				/>
			</div>
			
			<div className={`${toggleVis ? 'show' : 'hide'}`}>

			<div className="input">
				<input
					className="add-comment"
					type="text"
					onChange={onChange}
					placeholder="Add a new comment"
					value={comment.comment}
				/>

				<FontAwesomeIcon
					className="addCommentButton"
					onClick={(e) => {
						handleAddComment(data._id, currentDay, dayId, comment);
						setComment({comment: ''});
					}}
					icon={faPaperPlane}
				/>
			</div>
			{/* console log day*/}
			<div className="comments-container">
				{day.comments.map((c) => (
					<div key={uuid()} className="comment">
						<p className="com">{c.comment}</p> 


						<div className="commentbuttons-container">
							<p>{format(c.date, 'dd/MM/yyyy kk:mm:ss')}</p>

							
							<p
								className="delete-comment"
								onClick={(e) =>
									handleDeleteComment(
										currentDay,
										dayId,
										e.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].textContent,
										data._id
									)
									}
							> </p>

							<Modal
								isOpen={!!toggle}
								onRequestClose={handleCloseModal}
								ariaHideApp={false}
								closeTimeoutMS={200}
								className="addroadmap-modal modal"
								style={{ overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' } }}
							>
								<input defaultValue={commentToEdit} type="text" name="completedHours" placeholder="comment" />

								<button
									onClick={(e) => {
										handleUpdateComment(
											data._id,
											currentDay,
											e.target.parentNode.childNodes[0].value,
											commentToEdit,
											dayId
										);
										handleCloseModal();
										// setCommentToEdit('');
									}}
									className="button"
								>
									Edit Comment
								</button>
							</Modal>

							<p
								className="edit-comment"
								onClick={(e) => {
									handleOpenModal();
									checkText(e);
									// console.log(e.target.parentNode.parentNode.parentNode.childNodes[0].textContent);
									// setCommentToEdit(e.target.parentNode.parentNode.childNodes[0].textContent);
								}}
							> </p>
						</div>
					</div>
				))}
			</div>
		</div>
		</div>
	);
};

DayComments.propTypes = {
	handleAddComment: PropTypes.func.isRequired,
	handleDeleteComment: PropTypes.func.isRequired,
	handleUpdateComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	data: state.weeks.currentWeek,
	day: state.weeks.currentDay
});

export default connect(mapStateToProps, { handleAddComment, handleDeleteComment, handleUpdateComment })(DayComments);
