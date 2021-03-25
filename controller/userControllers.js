const User = require("../models/user-schema");

exports.postUser = (req, res, next) => {
	const name = req.query.name;
	const choice = req.query.choice;
	const user = new User({
		name: name,
		choice: choice,
	});

	user
		.save()
		.then((result) => {
			res.status(201).json({
				id: user._id,
			});
		})
		.catch((error) => {
			next(error);
		});
};

exports.getUser = (req, res, next) => {
	const id = req.query.id;
	User.findById(id)
		.select("choice name friends")
		.then((userDoc) => {
			res.status(200).json({
				user: userDoc,
			});
		})
		.catch((error) => {
			next(error);
		});
};

exports.postFriend = (req, res, next) => {
	const id = req.query.id;
	const name = req.query.name;
	const score = req.query.score;
	User.findById(id)
		.then((userDoc) => {
			userDoc.friends.unshift({
				name: name,
				score: score,
			});
			return userDoc.save();
		})
		.then((result) => {
			res.status(200).json({
				message: "friends list updated",
			});
		})
		.catch((error) => {
			next(error);
		});
};
