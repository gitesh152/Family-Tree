const mongoose = require("mongoose");

//creating connection
// mongoose.connect("mongodb://127.0.0.1/mern_ui_database");
mongoose.connect(
  process.env.MONGO_URI
);

//storing connection
const db = mongoose.connection;

//checking error
db.on("error", console.error.bind(console, "Error connecting database ..."));

//as connection opens
db.once("open", () =>
  console.log(`Connected to mongodb database :: ${db.name}`)
);

//exporting connection
module.exports = db;
