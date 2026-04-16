const express = require('express');
const db = require('../db');

const router = express.Router();

// GET ALL QUESTIONS
router.get('/', (req, res) => {
	db.query('SELECT * FROM questions', (err, result) => {
		if (err) return res.status(500).json(err);
		res.json(result);
	});
});

// ADD QUESTION 
router.post('/', (req, res) => {
	const q = req.body;

	const sql = `
    INSERT INTO questions 
    (question, code, opt1, opt2, opt3, opt4, correct, subject)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

	db.query(
		sql,
		[
			q.question,
			q.code,
			q.optionA,
			q.optionB,
			q.optionC,
			q.optionD,
			q.correct,
			q.subject,
		],
		(err) => {
			if (err) {
				console.log(err); 
				return res.status(500).json(err);
			}
			res.json({ msg: 'Question Added Successfully' });
		},
	);
});

//  DELETE QUESTION
router.delete('/:id', async (req, res) => {
	try {
		await db.query('DELETE FROM questions WHERE id = ?', [req.params.id]);
		res.json({ msg: 'Question deleted' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ msg: 'Error deleting question' });
	}
});

module.exports = router;
