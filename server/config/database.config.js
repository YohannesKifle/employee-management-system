const { DATABASE_CONNECTION_STRING } = require("../config/secrets.config");
const mongoose = require("mongoose");

//Set up default mongoose connection
mongoose.connect(DATABASE_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Get the default connection
const db = mongoose.connection;
//Bind connection to success event
db.on("connected", console.log.bind(console, "MongoDB successfully connected"));

//Bind connection to error event (
db.on("error", console.error.bind(console, "MongoDB connection error:"));
