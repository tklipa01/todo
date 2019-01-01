"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseHelper_1 = require("./utils/responseHelper");
const fs_1 = __importDefault(require("fs"));
class MongoDbClient {
    constructor() {
        const MongoClient = require("mongodb").MongoClient;
        const url = this.getConnectionString();
        this.client = new MongoClient(url, { useNewUrlParser: true });
    }
    getConnectionString() {
        return JSON.parse(fs_1.default.readFileSync("./config.json", "UTF-8"));
    }
    execute(res, func) {
        this.client.connect(err => {
            try {
                const db = this.client.db("Todo");
                func(db);
            }
            catch (_a) {
                console.error(err);
                responseHelper_1.InternalServerErrorResponse(res);
            }
        });
    }
}
exports.MongoDbClient = MongoDbClient;
//# sourceMappingURL=mongoDbClient.js.map