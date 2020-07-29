import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { handleAddWeek } from '../../actions/weeks';

const AddWeek = ({ handleAddWeek }) => {
	return (
		<div onClick={handleAddWeek} className="addWeek">
			<button>Add new week</button>
		</div>
	);
};


AddWeek.propTypes = {
	handleAddWeek: PropTypes.func.isRequired
};

export default connect(null, { handleAddWeek })(AddWeek);
