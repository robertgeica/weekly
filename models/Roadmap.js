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


// const RoadmapSchema = new Schema({
// 	userId: {
// 		type: Object,
// 		required: true
// 	},
// 	categoryName: {
// 		type: String,
// 		required: true
// 	},
// 	task: {
// 			taskName: {
// 				type: String,
// 				required: true
// 			},
// 			dueDate: {
// 				type: String
// 			},
// 			hoursSpent: [],
// 			progress: {
// 				type: Number
// 			},
// 			comments: []
// 	}
// });




module.exports = mongoose.model('Roadmap', RoadmapSchema);
