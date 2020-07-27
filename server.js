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


// Build for heroku

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
	console.log('Server is running on port', PORT);
});