const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3001;

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/static/index.html"));
});

app.use(express.static("static"));

app.listen(PORT, function () {
    console.log("Start serwera na porcie " + PORT);
});
