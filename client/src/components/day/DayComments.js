import React, { useState } from 'react';
import { uuid } from 'uuidv4';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleAddComment, handleDeleteComment } from '../../actions/weeks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const DayComments = ({ data, day, handleAddComment, handleDeleteComment }) => {

	const dayId = day.day;
	const currentDay = dayId % 7 == 0 ? 6 : dayId % 7 - 1;

	const [ comment, setComment ] = useState('');
	const onChange = (e) => setComment([ e.target.value ]);

	return (
		<div className="day-comments">
			<div className="input">
				<input className="add-comment" type="text" onChange={onChange} placeholder="comment" />

				<FontAwesomeIcon
					className="addCommentButton"
					onClick={() => handleAddComment(data._id, currentDay, dayId, comment[0])}
					icon={faPaperPlane}
				/>
			</div>

			<div className="comments-container">
				{day.comments.map((c) => (
					<div key={uuid()} className="comment">
						<p>{c}</p>
						<div>
							<button
								className="delete-comment"
								onClick={(e) =>
									handleDeleteComment(
										currentDay,
										dayId,
										e.target.parentNode.parentNode.childNodes[0].textContent,
										data._id
									)}
							>
								x
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

DayComments.propTypes = {
	handleAddComment: PropTypes.func.isRequired,
	handleDeleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	data: state.weeks.currentWeek, 
	day: state.weeks.currentDay
});

export default connect(mapStateToProps, { handleAddComment, handleDeleteComment })(DayComments);