import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Homepage = ({ auth: { isAuthenticated, loading } }) => {
	const loggedUser = (
		<div className="homepage">
			<h3>Welcome back!</h3>
		</div>
	);

	const guestUser = (
		<div className="landing">
			<h3>Hi! You have to connect first!</h3>
		</div>
	);
	return <Fragment>{!loading && <Fragment>{isAuthenticated ? loggedUser : guestUser}</Fragment>}</Fragment>;
};

Homepage.propTypes = {
	auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(Homepage);
