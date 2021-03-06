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
			tasks: [
				{
					taskName: {
						type: String
					},
					slotNumber: {
						type: Number
					}
				}
			],
			comments: []
		}
	]
});

module.exports = Week = mongoose.model('Week', WeekSchema);
