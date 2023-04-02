// Import library
const express = require("express");

// Import components
const postController = require("../controllers/post");

const router = express.Router();

router.get("/", postController.index);
router.get("/dashboard/:username", postController.getPosts);
router.get("/:username/:slug", postController.getPost);
router.post("/create", postController.create);
router.put("/edit", postController.edit);
router.delete("/delete", postController.delete);

module.exports = router;
