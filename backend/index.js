const express = require("express");
const connectToMongo = require("./db");

connectToMongo();

const app = express();
const port = 3000;

app.use(express.json());

// Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});