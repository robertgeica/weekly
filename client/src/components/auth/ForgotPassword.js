import React, { useState } from 'react';
import axios from 'axios';

// Redux
import { connect } from 'react-redux';
import store from '../../store/store';

import PropTypes from 'prop-types';
// Actions
import { forgotPassword } from '../../actions/auth';


const ForgotPassword = ({ resetEmail }) => {
	const [ formData, setFormData ] = useState({ email: '' });
	const { email } = formData;

	const handleChange = (text) => (e) => {
		setFormData({ ...formData, [text]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (email) {
			store.dispatch(forgotPassword({email}));
      console.log(email);
		} else {
			console.log('Please fill all fields');
		}
	};


	return (
		<div className="forgot-password">
			<h3>Forget Password?</h3>
      <h4> Reset it now </h4>

				<form className="form" onSubmit={e => handleSubmit(e)}>
					<input type="email" placeholder="Email" onChange={handleChange('email')} value={email} />

					<button className="button" type="submit"> Submit </button>
				</form>
		</div>
	);
};


const mapStateToProps = state => ({
	resetEmail: state.auth.resetEmail
});

export default connect(mapStateToProps)(ForgotPassword);
