const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	// Get token from header
	const token = req.header('auth-token');

	// Check if token exists
	if (!token) return res.status(401).json({ msg: 'No token, auth denied. ' });

	// Verify token

	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		next();
	} catch (error) {
		res.status(401).json({ msg: 'Invalid token' });
	}
};
