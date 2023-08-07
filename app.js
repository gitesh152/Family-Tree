const dotenv = require('dotenv')
dotenv.config()
const express = require("express");
const app = express();
const mongoose = require('./config/mongoose');
const Family = require('./models/family');
const path = require('path')

var cors = require("cors");

app.use(cors());
var bodyParser = require('body-parser')


// parse application/json
app.use(bodyParser.json())

app.post('/add', async (req, res) => {
    const newMember = await Family.create(req.body);
    console.log(newMember)
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ Message: `Added ${req.body.name} to family...` }));
});

app.get('/clean', async (req, res) => {
    const family = await Family.deleteMany({});
    console.log(family);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Ready for fresh data...' }));
});


// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));