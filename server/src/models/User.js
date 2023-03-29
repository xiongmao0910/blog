// Import library
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: { type: String, require: true, unique: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        photoURL: { type: String },
        bio: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", User);
