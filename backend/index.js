// Importing required modules
const express = require("express");
const connectToMongo = require("./db");
const cors = require("cors");

// Connecting to the database
connectToMongo();

const app = express();
const port = 4000;

// Middleware to work with JSON
app.use(express.json());

// Middleware for cors
app.use(cors());

// Available Routes
// Authentication endpoint
app.use("/api/auth", require("./routes/auth"));

// Endpoint to work with notes
app.use("/api/notes", require("./routes/notes"));

// Start listening to the port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});