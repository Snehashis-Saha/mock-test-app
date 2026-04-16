const express = require('express');
const db = require('../db');

const router = express.Router();

// GET SETTINGS
router.get('/', (req, res) => {
	db.query('SELECT * FROM settings WHERE id=1', (err, result) => {
		if (err) return res.status(500).json(err);

		res.json(result[0]);
	});
});

// UPDATE SETTINGS
router.post('/', (req, res) => {
	const { totalQuestions, timer } = req.body;

	db.query(
		'UPDATE settings SET totalQuestions=?, timer=? WHERE id=1',
		[totalQuestions, timer],
		(err) => {
			if (err) return res.status(500).json(err);

			res.json({ msg: 'Settings Updated' });
		},
	);
});

module.exports = router;