const express = require('express');
const router = express.Router();
let Roadmap = require('../../models/Roadmap');
const User = require('../../models/User');
const auth = require('../../middleware/auth');

// @route           GET /roadmap
// @description     Test route
router.get('/', auth, async (req, res) => {
	try {
		const query = { userId: req.user.id };
		const roadmap = await Roadmap.find(query);

		res.send(roadmap);
	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
	}
});

// @route           GET /roadmap/:id
// @description     Test route
router.get('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		const roadmap = await Roadmap.findById(id);

		if (roadmap.userId !== req.user.id) {
			console.log('not allowed to delete this roadmap');
		}

		res.json(roadmap);
	} catch (error) {
		res.status(400).send('Error getting the roadmap.');
	}
});

// @route           POST /roadmap
// @description     Add Roadmap
router.post('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		let roadmap = await new Roadmap(req.body);
		roadmap.userId = req.user.id;
		roadmap.save();

		res.status(200).json({ roadmap: 'Added new roadmap successfully!' });
	} catch (error) {
		res.status(400).send('Adding new roadmap failed.');
	}
});

// @route           DELETE /roadmap/:id
// @description     Delete Roadmap
router.delete('/:id', auth, async (req, res) => {
	try {
		let id = await req.params.id;
		let userId = req.user.id;

		const roadmap = await Roadmap.findOne({ _id: id, userId });

		if (roadmap.userId !== userId) {
			console.log('not allowed to delete this roadmap');
		}

		const roadmaps = await Roadmap.findByIdAndRemove({ _id: id });
		res.send(roadmap);
	} catch (error) {
		res.status(400).send('Error deleting roadmap.');
	}
});

// @route           POST /roadmap/:id
// @description     Update roadmap task
router.post('/:id', auth, async (req, res) => {
	console.log(req.body);
	try {
		let roadmap = await Roadmap.findById(req.params.id);

		if (roadmap.userId !== req.user.id) {
			console.log('not allowed to delete this roadmap');
		}

		if (!roadmap) res.status(404).send('No roadmap to update.');

		roadmap.categoryName = req.body.categoryName;
		roadmap.task.name = req.body.task.name;
		roadmap.task.allocatedHours = req.body.task.allocatedHours;
		roadmap.task.completedHours = req.body.task.completedHours;

		await roadmap.save();
		res.json('Roadmap updated successfully.');
	} catch (error) {
		res.status(400).send('Error editing the week.');
	}
});

module.exports = router;
