const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const User = require('../../models/User');

// @route           GET /auth
// @description     Test route
// @access          Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (error) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
});

// @route           POST /auth
// @description     Authenticate user & get token
// @access          Public
router.post(
	'/',
	[ check('email', 'Email must be valid').isEmail(), check('password', 'Password is required').exists() ],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;

		try {
			// Check if user exists
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });
			}

			// Match password
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });
			}

			// Return JWT
			const payload = {
				user: {
					id: user._id
				}
			};

			jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (err, token) => {
				if (err) throw err;
				res.json({ token });
			});
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server error');
		}
	}
);

// @route           PUT /auth/forgotpassword
// @description     check if user exist and send email
// @access          Public
router.put('/forgotpassword', async (req, res) => {
	const { email } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).json({ errors });
	} else {
		// check if user exists
		User.findOne({ email }, (err, user) => {
			if (err || !user) {
				return res.status(400).json({ error: 'user with that emal does not exist ' });
			}

			// if so, generate token
			const token = jwt.sign({ _id: user._id }, config.JWT_RESET_PASSWORD, { expiresIn: '10m' });

			const emailData = {
				from: 'geicarobert@gmail.com',
				to: email,
				subject: `Reset Password Link`,
				html: `
					<p>${config.CLIENT_URL}/resetpassword/${token}</p>
				
					<p>${config.CLIENT_URL}</p>
				`
			};

			// update user with new token
			return user.updateOne({ resetPasswordLink: token }, (err, success) => {
				if (err) {
					console.log('Error reset password link', err);
				} else {
					// and send email
					sgMail
						.send(emailData)
						.then((sent) => {
							return res.json({ message: `Email has been sent to ${email}` });
						})
						.catch((err) => {
							return res.json({ message: err.message });
						});
				}
			});
		});
	}
});

// @route           PUT /auth/resetpassword
// @description     set new password
// @access          Public
router.put('/resetpassword', async (req, res) => {
	const { resetPasswordLink, newPassword, email } = req.body;
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		console.log(errors);
		return res.status(422).json({ errors });
	} else {
		// check if link exists
		if (resetPasswordLink) {
			jwt.verify(resetPasswordLink, config.JWT_RESET_PASSWORD, async (err, decoded) => {
				if (err) {
					return res.status(400).json({ error: 'expired link' });
				}

				// find user
				await User.findOne({ email }, async (err, user) => {
					
					if (err || !user) {
						return res.status(400).json({
							error: 'something went wrong. try again'
						});
					}

					// get new password
					const updateFields = {
						email: email,
						password: newPassword,
						resetPasswordLink: ''
					};

					// encrypt password
					const salt = await bcrypt.genSalt(10);
					updateFields.password = await bcrypt.hash(updateFields.password, salt);

					// update user and save 
					user.password = updateFields.password;
					user.save((err, result) => {
						if (err) {
							return res.status(400).json({ error: ' error resetting user pass' });
						}
						res.json({ message: 'success, you can log in with new password ' });
					});
				});
			});
		}
	}
});

module.exports = router;
