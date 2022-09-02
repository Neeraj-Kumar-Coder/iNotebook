// Importing requred modules
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const JWT_SIGNATURE = "@sign@tureto^%#112";

const router = express.Router();

// Handling request to create a new user
// Validations to be performed on the request received
let validations = [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Enter a valid password.").isLength({ min: 5 })
];

router.post("/createUser", validations, async (req, res) => {
    // Checking if the request is a valid request or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Checking if the user with the current email is already registered or not
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ "error": "Email already registered!" });
        }

        // If it is a new email, then create and save this user

        // Creating a hash of the password
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        let data = {
            "user": {
                "id": user.id
            }
        };

        const authToken = jwt.sign(data, JWT_SIGNATURE);

        res.json({ authToken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router;