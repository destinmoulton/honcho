function honcho(server) {
    // Wraps the hapi route() method
    function route(hapiRouteOptions) {
        server.route(hapiRouteOptions);
    }
}

exports.honcho = honcho;
