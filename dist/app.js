"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bodyParser = __importStar(require("body-parser"));
const taskRoutes_1 = require("./routes/taskRoutes");
const mongoDbClient_1 = require("./mongoDbClient");
const express_jwt_1 = __importDefault(require("express-jwt"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
class App {
    constructor() {
        this.mongoDbClient = new mongoDbClient_1.MongoDbClient();
        this.taskRoutes = new taskRoutes_1.TaskRoutes(this.mongoDbClient);
        this.app = express_1.default();
        this.config();
        this.taskRoutes.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        const jwtCheck = express_jwt_1.default({
            secret: jwks_rsa_1.default.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: "https://my-todo.auth0.com/.well-known/jwks.json"
            }),
            audience: 'todoAPI',
            issuer: "https://my-todo.auth0.com/",
            algorithms: ['RS256']
        });
        this.app.use(jwtCheck);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map