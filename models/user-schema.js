const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		name: {
			type: Schema.Types.String,
			required: true,
		},
		choice: {
			type: [],
		},
		friends: {
			type: [
				{
					name: {
						type: Schema.Types.String,
					},
					score: {
						type: Schema.Types.Number,
					},
					created_time: {
						type: Schema.Types.String,
						default: Date(),
					},
				},
			],
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
