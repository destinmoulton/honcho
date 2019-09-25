"use strict";

// Print error to console and exit
function criticalError(error) {
    console.error(error);
    process.exit(1);
}

exports.criticalError = criticalError;
