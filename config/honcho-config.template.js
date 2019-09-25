/**
 * This is a template config file for honcho.
 *
 * Copy this file, and name the copy honcho-config.js
 *
 */
module.exports = {
    server: {
        port: 3000,
        host: "localhost"
    },
    // knex is used to connect to the database
    // http://knexjs.org/#Installation-client
    db: {
        client: "mysql", //mysql, sqlite3, pg, etc...
        connection: {
            host: "127.0.0.1",
            user: "your_database_user",
            password: "your_database_password",
            database: "myapp_test"
        }
    }
};
