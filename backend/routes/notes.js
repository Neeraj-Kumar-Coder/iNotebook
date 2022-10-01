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

// Route 3: Update an existing note
router.put("/updateNote/:id", getuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // Finding the note and checking for access controls
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString().localeCompare(req.user.id)) {
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

// Route 4: Delete an existing note
router.delete("/deleteNote/:id", getuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Not found");
        }

        if (note.user.toString().localeCompare(req.user.id)) {
            return res.status(401).send("Not allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ "success": "Note is successfully deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router;