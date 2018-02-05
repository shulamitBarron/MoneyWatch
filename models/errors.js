"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autonticationError = function () { return ({
    errorCode: 401,
    message: "Authontication failed."
}); };
exports.parameterRequaire = function (paramName) { return ({
    errorCode: 400,
    message: paramName + " is requaire."
}); };
exports.InsightnotVaild = function (insightId) { return ({
    errorCode: 400,
    message: insightId + " is not valid for this bank."
}); };
