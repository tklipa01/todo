"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function CreatedResponse(res, result) {
    res.status(201).json(result);
}
exports.CreatedResponse = CreatedResponse;
function OkResponse(res, result) {
    res.status(200).json(result);
}
exports.OkResponse = OkResponse;
function OkNoContentResponse(res) {
    res.status(204).json(null);
}
exports.OkNoContentResponse = OkNoContentResponse;
function BadRequestResponse(res, result) {
    res.status(400).json(result);
}
exports.BadRequestResponse = BadRequestResponse;
function InternalServerErrorResponse(res) {
    res.status(500).json(null);
}
exports.InternalServerErrorResponse = InternalServerErrorResponse;
//# sourceMappingURL=responseHelper.js.map