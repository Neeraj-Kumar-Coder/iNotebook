// Importing requred modules
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/User");
const getuser = require("../middleware/getuser");

const JWT_SIGNATURE = "@sign@tureto^%#112";

const router = express.Router();

// ROUTE 1: Create a new user
let signupValidations = [
    body("name", "Enter a valid name.").isLength({ min: 3 }),
    body("email", "Enter a valid email.").isEmail(),
    body("password", "Enter a valid password.").isLength({ min: 5 })
];

router.post("/createUser", signupValidations, async (req, res) => {
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


// ROUTE 2: Authenticate a user
let loginValidations = [body("email", "Enter a valid email").isEmail(), body("password", "Password cannot be blank").exists()];
router.post("/login", loginValidations, async (req, res) => {
    // Checking if the request is a valid request or not
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });

        // User doesn't exists
        if (!user) {
            return res.status(400).json({ "error": "Please login using valid credentials" });
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        // Password is incorrect
        if (!correctPassword) {
            return res.status(400).json({ "error": "Please login using valid credentials" });
        }

        // If entered data is correct then proceed giving JWT token
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

// ROUTE 3: Get user details
router.post("/getuser", getuser, async (req, res) => {
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
});

module.exports = router;