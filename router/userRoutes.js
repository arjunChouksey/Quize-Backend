const express = require("express");

const router = express.Router();

const userController = require("../controller/userControllers");

router.post("/post", userController.postUser);
router.get("/get", userController.getUser);
router.post("/post-friend", userController.postFriend);

module.exports = router;
