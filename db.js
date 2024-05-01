const mongoose = require("mongoose");

const dbURI = process.env.DB_URL;

mongoose
  .connect(dbURI) //uniform resource identifier
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
