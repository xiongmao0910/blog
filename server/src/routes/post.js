// Import library
const express = require("express");

// Import components
const postController = require("../controllers/post");

const router = express.Router();

router.get("/", postController.index);
router.get("/:username/:slug", postController.getPost);
router.post("/create", postController.create);

module.exports = router;
