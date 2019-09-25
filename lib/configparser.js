"use strict";
const fs = require("fs");

const REQUIRED_SETTINGS = {
    server: ["port", "host"],
    db: ["client", "connection"]
};
function loadFromFile(configPath) {
    if (!fs.existsSync(configPath)) {
        throw new Error(
            "The configuration file does not exist.\nMake sure that `config/honcho-config.js` has been created.\nCopy and rename `config/honcho-config.template.js` to `config/honcho-config.js` and set the configuration variables."
        );
    }

    const configOptions = require(configPath);
    try {
        validateRequiredSettings(configPath, configOptions);
        return configOptions;
    } catch (err) {
        throw err;
    }
}

function validateRequiredSettings(configPath, possibleConfig) {
    for (let key in REQUIRED_SETTINGS) {
        if (!possibleConfig.hasOwnProperty(key)) {
            throw new Error(
                `The configuration file '${configPath}' is missing a setting. You must add a config entry for '${key}'.`
            );
        } else {
            for (let setting of REQUIRED_SETTINGS[key]) {
                if (!possibleConfig[key].hasOwnProperty(setting)) {
                    throw new Error(
                        `The configuration file '${configPath}' is missing a setting. The '${key}' setting must have a config entry for '${setting}'.`
                    );
                }
            }
        }
    }
}

exports.loadFromFile = loadFromFile;
