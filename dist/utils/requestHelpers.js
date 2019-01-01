"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function requestBodyEmpty(req) {
    return req.body.constructor === Object && Object.keys(req.body).length === 0;
}
exports.requestBodyEmpty = requestBodyEmpty;
//# sourceMappingURL=requestHelpers.js.map