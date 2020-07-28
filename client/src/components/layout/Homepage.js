import React, { Fragment } from 'react';

// Redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Homepage = ({ auth: { isAuthenticated, loading }}) => {

    const loggedUser = (
        <div className="homepage">
            Welcome back!
        </div>
    );

    const guestUser = (
        <div className="landing">
            Hi! You have to connect first!
        </div>
    )
    return (
        <Fragment>
            {!loading && <Fragment>{isAuthenticated ? loggedUser : guestUser}</Fragment>}
        </Fragment>
    );
}

Homepage.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps)(Homepage);
