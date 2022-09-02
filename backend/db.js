const mongoose = require("mongoose");
const database = "iNotebook";
const mongoURI = `mongodb://localhost:27017/${database}`;

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log(`Connection successfull to ${database} database!`);
    });
}

module.exports = connectToMongo;