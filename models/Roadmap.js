const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoadmapSchema = new Schema({
	userId: {
		type: Object,
		required: true
	},
	categoryName: {
		type: String,
		required: true
	},
	task: {
			name: {
				type: String,
				required: true
			},
			allocatedHours: {
				type: Number,
				required: true
			},
			completedHours: {
				type: Number,
				required: true
			}
	}
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);
