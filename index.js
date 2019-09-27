"use strict";
const path = require("path");
const Hapi = require("@hapi/hapi");
const { criticalError } = require("./lib/errorhandler");
const configparser = require("./lib/configparser");
const BASE_PATH = __dirname;
const CONFIG_PATH = path.join(BASE_PATH, "config/honcho-config.js");
let server = {};
let config = {};
try {
    config = configparser.loadFromFile(CONFIG_PATH);
} catch (error) {
    criticalError(error);
}

process.on("unhandledRejection", err => {
    criticalError(err);
});

const startServer = async config => {
    server = Hapi.server(config.server);

    server.route({
        method: "GET",
        path: "/",
        handler: (request, h) => {
            return "HI!";
        }
    });
    await server.start();
    console.log(`Server running. ${server.info.uri}`);
};

startServer(config);
