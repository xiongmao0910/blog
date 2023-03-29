// Import library
const express = require("express");

// Import components
const userController = require("../controllers/user");
const userMiddlewares = require("../middlewares/user");

const router = express.Router();

router.get("/:token", userMiddlewares.verifyToken, userController.index);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/update", userController.update);

module.exports = router;
