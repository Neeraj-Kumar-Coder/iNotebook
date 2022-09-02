// Importing required modules
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Creating user schema
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// modelling the schema
const User = mongoose.model("user", userSchema);

module.exports = User;