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
	weekFocus: {
		learnTask1: {
			type: String
		},
		practiceTask1: {
			type: String
		},
		learnHoursTask1: {
			type: String
		},
		practiceHoursTask1: {
			type: String
		},
		learnTask2: {
			type: String
		},
		practiceTask2: {
			type: String
		},
		learnHoursTask2: {
			type: String
		},
		practiceHoursTask2: {
			type: String
		},

		learnTask3: {
			type: String
		},
		practiceTask3: {
			type: String
		},
		learnHoursTask3: {
			type: String
		},
		practiceHoursTask3: {
			type: String
		}
	},

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
