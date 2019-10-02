"use strict";
const path = require("path");
const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Nunjucks = require("nunjucks");

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

    // Setup nunjucks as the view engine
    await server.register(Vision);
    server.views({
        engines: {
            html: {
                compile: (src, options) => {
                    const template = Nunjucks.compile(src, options.environment);

                    return context => {
                        return template.render(context);
                    };
                },
                prepare: (options, next) => {
                    options.compileOptions.environment = Nunjucks.configure(
                        options.path,
                        { watch: false }
                    );
                    return next();
                }
            }
        },

        relativeTo: __dirname,
        path: "core/templates"
    });

    // Setup static file serving
    await server.register(require("@hapi/inert"));

    server.route({
        method: "GET",
        path: "/assets/{param*}",
        handler: {
            directory: {
                path: "public/assets"
            }
        }
    });

    server.route({
        method: "GET",
        path: "/login",
        handler: (request, h) => {
            return h.view("login");
        }
    });
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
