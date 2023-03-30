// Import library
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Post = new Schema(
    {
        title: { type: String, require: true },
        content: { type: String, require: true },
        photoURL: { type: String, default: "" },
        username: { type: String, require: true },
        slug: { type: String, require: true },
        tags: { type: Array, default: [] },
    },
    { timestamps: true }
);

module.exports = mongoose.model("post", Post);
