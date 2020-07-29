const express = require('express');
const router = express.Router();
let Week = require('../../models/Week');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route           GET /weeks
// @description     Test route
router.get('/', auth, async (req, res) => {
	try {
		const query = { userId: req.user.id };
		const week = await Week.find(query);
		res.json(week);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route           POST /weeks
// @description     Add Week
router.post('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		let week = await new Week(req.body);
		week.userId = req.user.id;
		week.save();

		res.status(200).json({ week: 'Added new week successfully!' });
	} catch (error) {
		res.status(400).send('Adding new week failed.');
	}
});

// @route           DELETE /weeks/:id
// @description     Delete Week
router.delete('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		let userId = req.user.id;

		const week = await Week.findOne({ _id: id, userId });

		if(week.userId !== userId) {
			console.log('not allowed to delete this week');
		}

		const weeks = await Week.findByIdAndRemove({_id: id});
		res.send(week);
	} catch (error) {
		res.status(400).send('Error deleting week.');
	}
});

// @route           GET /weeks/:id
// @description     Test route
router.get('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		const week = await Week.findById(id);

		if(week.userId !== req.user.id) {
			console.log('not allowed to delete this week');
		}

		res.json(week);
	} catch (error) {
		res.status(400).send('Error getting the week.');
	}
});

// @route           POST /weeks/:id
// @description     Update route
router.post('/:id', auth, async (req, res) => {
	try {
		let week = await Week.findById(req.params.id);

		if(week.userId !== req.user.id) {
			console.log('not allowed to delete this week');
		}

		if (!week) res.status(404).send('No week to update.');
		// update week focus
		week.weekFocus.learnTask1 = req.body.weekFocus.learnTask1;
		week.weekFocus.practiceTask1 = req.body.weekFocus.practiceTask1;
		week.weekFocus.learnHoursTask1 = req.body.weekFocus.learnHoursTask1;
		week.weekFocus.practiceHoursTask1 = req.body.weekFocus.practiceHoursTask1;

		week.weekFocus.learnTask2 = req.body.weekFocus.learnTask2;
		week.weekFocus.practiceTask2 = req.body.weekFocus.practiceTask2;
		week.weekFocus.learnHoursTask2 = req.body.weekFocus.learnHoursTask2;
		week.weekFocus.practiceHoursTask2 = req.body.weekFocus.practiceHoursTask2;

		week.weekFocus.learnTask3 = req.body.weekFocus.learnTask3;
		week.weekFocus.practiceTask3 = req.body.weekFocus.practiceTask3;
		week.weekFocus.learnHoursTask3 = req.body.weekFocus.learnHoursTask3;
		week.weekFocus.practiceHoursTask3 = req.body.weekFocus.practiceHoursTask3;

		// update day tasks
		const crrDayArr = req.body.days.map((d) => d.day);
		const crrDay = crrDayArr[0];

		// check if last day of week
		let dayToEdit = crrDay % 7 - 1;
		if (crrDay % 7 == 0) {
			dayToEdit = 6;
		} else {
			dayToEdit = crrDay % 7 - 1;
		}

		week.days[dayToEdit].tasks.h1 = req.body.days[0].tasks.h1;
		week.days[dayToEdit].tasks.h2 = req.body.days[0].tasks.h2;
		week.days[dayToEdit].tasks.h3 = req.body.days[0].tasks.h3;
		week.days[dayToEdit].tasks.h4 = req.body.days[0].tasks.h4;
		week.days[dayToEdit].tasks.h5 = req.body.days[0].tasks.h5;

		// update completedhours
		week.days[dayToEdit].completedHours = req.body.days[0].completedHours;

		// update comments and date
		week.days[dayToEdit].comments = req.body.days[0].comments;

		console.log(week);
		await week.save();
		res.json('Week Updated successfully.');
	} catch (error) {
		res.status(400).send('Error editing the week.');
	}
});

module.exports = router;
