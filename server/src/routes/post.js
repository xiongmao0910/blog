// Import library
const express = require("express");

// Import components
const postController = require("../controllers/post");

const router = express.Router();

router.get("/:username/:slug", postController.index);
router.post("/create", postController.create);

module.exports = router;
