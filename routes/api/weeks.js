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
	const { newWeek, slotId } = req.body;

	try {
		let week = await Week.findById(req.params.id);

		if(week.userId !== req.user.id) {
			console.log('not allowed to edit this week');
		}

		if (!week) res.status(404).send('No week to update.');

		// get current day
		const crrDayArr = newWeek.days.map((d) => d.day);
		const crrDay = crrDayArr[0];

		// check if last day of week
		let dayToEdit = crrDay % 7 -1;
		// console.log('crr dday', crrDay);
		if(dayToEdit === -1) { dayToEdit = 0 }
		if(crrDay === 7) { dayToEdit = 6 }

		// console.log(`crtDay ${crrDay}`);
		// console.log(`week.days[${dayToEdit}]`);


		// verifica daca ziua = 1 sau 7 si pune la dayToEdit 0 sau 6

		// at add new comment, crrDay is +1



		// update weekfocus and day tasks
		week.weekFocus = newWeek.weekFocus;
		week.days[dayToEdit].tasks = newWeek.days[0].tasks;
	
		// update completedhours
		week.days[dayToEdit].completedHours = newWeek.days[0].completedHours;

		// update comments
		week.days[dayToEdit].comments = newWeek.days[0].comments;

		// console.log(week.days[dayToEdit].comments);
		// console.log(newWeek.days[0].comments);
		await week.save();
		// console.log(week.days[0].comments);
		// console.log(newWeek.days[0].comments);
		// console.log('dayToEdit', dayToEdit);
		res.json('Week Updated successfully.');
	} catch (error) {
		console.log(error);
		res.status(400).send('Error editing the week.');
	}
});

module.exports = router;
