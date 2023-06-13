import * as SecureStore from "expo-secure-store";

const defaultServerAddress = "http://192.168.1.30"; // ipconfig getifaddr en0
const defaultServerPort = 3000;

const saveItem = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
};

const saveAndReturnItem = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
    return await getItem(key);
};

const getItem = async (key) => {
    return await SecureStore.getItemAsync(key);
};

const deleteItem = async (key) => {
    await SecureStore.deleteItemAsync(key);
};

const getServerAddress = async () => {
    const serverAddress =
        (await getItem("serverAddress")) ||
        saveAndReturnItem("serverAddress", defaultServerAddress);
    return serverAddress;
};

const getServerPort = async () => {
    const serverPort =
        (await getItem("serverPort")) ||
        saveAndReturnItem("serverPort", defaultServerPort);

    return serverPort;
};

const setServerAddress = async (serverAddress) => {
    await saveItem("serverAddress", serverAddress);
};

const setServerPort = async (serverPort) => {
    await saveItem("serverPort", String(serverPort));
};

module.exports = {
    defaultServerAddress,
    defaultServerPort,
    setServerAddress,
    setServerPort,
    getServerAddress,
    getServerPort,
};
