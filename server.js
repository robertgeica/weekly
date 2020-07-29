const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

// Connect database
connectDB();

// Apply Middlewares
app.use(cors());
app.use(express.json({ extended: false }));

// Define routes
app.use('/auth', require('./routes/api/auth'));
app.use('/register', require('./routes/api/register'));
app.use('/weeks', require('./routes/api/weeks'));

// Build for heroku
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});