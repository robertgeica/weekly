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
		// res.json(roadmap);
		res.send(roadmap);



	} catch (error) {
		console.log(error);
		res.status(500).send('Server Error');
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

		if(roadmap.userId !== userId) {
			console.log('not allowed to delete this roadmap');
		}

		const roadmaps = await Roadmap.findByIdAndRemove({_id: id});
		res.send(roadmap);
	} catch (error) {
		res.status(400).send('Error deleting roadmap.');
	}
});

module.exports = router;
