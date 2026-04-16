const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

require('./db');

const questionRoutes = require('./routes/questions');
const settingsRoutes = require('./routes/settings');

const app = express();

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// API ROUTES
app.use('/questions', questionRoutes);
app.use('/settings', settingsRoutes);

// STATIC FILES (IMPORTANT - pehle lagao)
app.use(express.static(path.join(__dirname, '../frontend')));

// PAGES ROUTES
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/admin', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/admin.html'));
});

app.get('/test', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/test.html'));
});

app.get('/results', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/results.html'));
});

// DEBUG ROUTE (optional but useful)
app.get('/ping', (req, res) => {
	res.json({ msg: 'Server running perfectly' });
});

// SERVER START
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});