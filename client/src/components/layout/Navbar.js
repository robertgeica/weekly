import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const userLinks = (
        <div className="links">
            <Link to="/weeks">Weeks</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link onClick={logout} to="/login">Logout</Link>
        </div>
    );

    const guestLinks = (
        <div className="links">
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
        </div>
    );

    return (
        <nav className="navbar">
		
			<h1>
				<Link to="/">Weekly</Link>
			</h1>
			{!loading && <Fragment>{isAuthenticated ? userLinks : guestLinks}</Fragment>}
		</nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navbar);
