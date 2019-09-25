const path = require("path");
const Hapi = require("@hapi/hapi");
const { criticalError } = require("./lib/errorhandler");
const configparser = require("./lib/configparser");
const BASE_PATH = __dirname;
const CONFIG_PATH = path.join(BASE_PATH, "config/honcho-config.js");
let server = {};
try {
    const config = configparser.loadFromFile(CONFIG_PATH);
} catch (error) {
    criticalError(error);
}

process.on("unhandledRejection", err => {
    criticalError(err);
});

const startServer = async config => {
    server = Hapi.server(config.server);
};
