const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let WeekSchema = new Schema({
	userId: {
		type: Object,
		required: true
	},
	week: {
		type: Number
	},
	weekFocus: [
		{
			task: { 
				type: String
			},
			allocatedHours: { 
				type: String
			},
			completedHours: { 
				type: String
			}
		}
	],
	days: [
		{
			day: {
				type: Number
			},
			completedHours: {
				type: Number
			},
			tasks: {
				h1: {
					type: String
				},
				h2: {
					type: String
				},
				h3: {
					type: String
				},
				h4: {
					type: String
				},
				h5: {
					type: String
				}
			},
			comments: []
		}
	]
});

module.exports = Week = mongoose.model('Week', WeekSchema);
