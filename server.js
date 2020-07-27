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

// Build for heroku

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});