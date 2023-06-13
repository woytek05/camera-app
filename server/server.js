const fsPromises = require("fs").promises;
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const variables = require("./variables");
const formidable = require("formidable");
const functions = require("./serverFunctions");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 3000;

app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify({ response: "Server is running!" }, null, 5));
});

app.get("/getFiles", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");

    const files = await functions.getContentsOfFolder(variables.uploadPath);

    res.send(JSON.stringify({ files: files }, null, 5));
});

app.post("/removeFiles", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    const fileNames = req.body.fileNames || [];

    for (const fileName of fileNames) {
        await functions.removeFile(path.join(variables.uploadPath, fileName));
    }

    res.send(JSON.stringify({ response: "Removed!" }, null, 5));
});

app.post("/renameFile", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
    const oldFileName = req.body.oldFileName;
    const extension = oldFileName.split(".").at(-1);
    const newFileName = req.body.newFileName;

    if (oldFileName && newFileName) {
        await functions.rename(
            path.join(variables.uploadPath, oldFileName),
            path.join(variables.uploadPath, `${newFileName}.${extension}`)
        );
    }

    res.send(JSON.stringify({ response: "Renamed!" }, null, 5));
});

app.post("/upload", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");

    const form = formidable({});
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = variables.uploadPath;
    form.maxFileSize = 500 * 1024 * 1024;

    form.on("error", (err) => {
        console.log("An error has occured with form upload");
        console.log(err);
    });

    form.on("aborted", (err) => {
        console.log("User aborted upload");
    });

    form.onPart = (part) => {
        part.pipe(fs.createWriteStream(variables.uploadPath + "/" + part.name));
    };

    form.parse(req, (err, fields, files) => {});

    res.send(JSON.stringify({ response: "Uploaded!" }, null, 5));
});

app.listen(PORT, function () {
    console.log("Start serwera na porcie " + PORT);
});
