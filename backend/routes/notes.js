const express = require("express");
const getuser = require("../middleware/getuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// Route 1: Get all the notes of the current user
router.get("/fetchAllNotes", getuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

// Route 2: Add a note to the database
const notesValidator = [body("title", "Enter a valid title").isLength({ min: 5 }), body("description", "Description must be atleast 10 characters long").isLength({ min: 10 })];
router.post("/addNote", getuser, notesValidator, async (req, res) => {
    try {
        // Checking if the request is a valid request or not
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const note = new Notes({
            title, description, tag, user: req.user.id
        });

        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router;