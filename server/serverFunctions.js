const fsPromises = require("fs").promises;
const fs = require("fs");
const path = require("path");

const checkIfPathExists = async (path) => {
    try {
        await fsPromises.access(path);
        return true;
    } catch (error) {
        return false;
    }
};

const getContentsOfFolder = async (folderPath) => {
    let array = [];
    try {
        array = await fsPromises.readdir(folderPath);
    } catch (error) {
        console.log(error);
    } finally {
        return array;
    }
};

const getContentsOfFile = async (path) => {
    let data = "";
    try {
        data = await fsPromises.readFile(path, "utf-8");
    } catch (error) {
        console.log(error);
        data = "ERROR";
    } finally {
        return data;
    }
};

const createNewFolder = async (folderPath) => {
    try {
        await fsPromises.mkdir(folderPath);
    } catch (error) {
        console.log(error);
    }
};

const removeFolder = async (folderPath) => {
    try {
        const data = await fsPromises.readdir(folderPath);

        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                const elPath = path.join(folderPath, data[i]);
                const stat = await fsPromises.lstat(elPath);

                if (stat.isDirectory()) {
                    await removeFolder(elPath);
                } else {
                    await removeFile(elPath);
                }
            }
        }
        await fsPromises.rmdir(folderPath);
    } catch (error) {
        console.log(error);
    }
};

const saveFile = async (filePath, text) => {
    try {
        await fsPromises.writeFile(filePath, text);
    } catch (error) {
        console.log(error);
    }
};

const createNewTextFile = async (textFilePath, data) => {
    try {
        await fsPromises.writeFile(`${textFilePath}${extension}`, data, "utf8");
    } catch (error) {
        console.log(error);
    }
};

const removeFile = async (filePath) => {
    try {
        await fsPromises.unlink(filePath);
    } catch (error) {
        console.log(error);
    }
};

const saveFileSync = (filePath, text) => {
    try {
        fs.writeFileSync(filePath, text);
    } catch (error) {
        console.log(error);
    }
};

const rename = async (oldPath, newPath) => {
    try {
        await fsPromises.rename(oldPath, newPath);
    } catch (error) {
        console.log(error);
        return "ERROR";
    }
};

module.exports = {
    checkIfPathExists,
    getContentsOfFolder,
    getContentsOfFile,
    createNewFolder,
    removeFolder,
    saveFile,
    createNewTextFile,
    removeFile,
    saveFileSync,
    rename,
};
