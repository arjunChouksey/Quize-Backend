// const dotenv = require("dotenv");
// dotenv.config();
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./router/userRoutes");

const PORT = process.env.PORT || 8080;
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9by7v.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//adding header to avoid CORS error=> (Cross Origin Resource Sharing Error)
app.use((req, res, next) => {
	//modify header
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"PUT, POST, DELETE, GET, PATCH"
	);
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	next();
});

app.use("/user", userRoutes);

// general error handling route
app.use((error, req, res, next) => {
	if (!error.statusCode) {
		error.statusCode = 500;
	}
	if (!error.message) {
		error.message = "INTERNAL SERVER ERROR";
	}
	res.status(error.statusCode).json({
		message: error.message,
	});
});

mongoose
	.connect(URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then((res) => {
		app.listen(PORT);
		console.log("CONNECTED TO DATABASE");
	})
	.catch((err) => {
		throw err;
	});
