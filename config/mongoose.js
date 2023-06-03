const mongoose = require("mongoose");

//creating connection
// mongoose.connect("mongodb://127.0.0.1/mern_ui_database");
mongoose.connect(
  "mongodb+srv://gitesh152:helloworld@cluster1.eirfrai.mongodb.net/mern_ui_database"
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
