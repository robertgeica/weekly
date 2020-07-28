import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout}) => {
    const userLinks = (
        <ul>
            <li>
                <Link to="/">
                    <span>link 1</span>
                </Link>
            </li>
            <li>
                <Link to="/">
                    <span>link 2</span>
                </Link>
            </li>
            <li>
                <Link onClick={logout} to="/login">
                    <span>Logout</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>

        </ul>
    );

    return (
        <nav >
		
			<h1>
				<Link to="/">Weekly</Link>
			</h1>
			{!loading && <div>{isAuthenticated ? userLinks : guestLinks}</div>}
		</nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { logout })(Navbar);
