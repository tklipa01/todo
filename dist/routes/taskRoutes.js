"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const task_1 = require("../models/task");
const requestHelpers_1 = require("../utils/requestHelpers");
const responseHelper_1 = require("../utils/responseHelper");
const responseHelper_2 = require("../utils/responseHelper");
class TaskRoutes {
    constructor(mongoDbClient) {
        this.dao = mongoDbClient;
    }
    routes(app) {
        this.getAllTasks(app);
        this.getTask(app);
        this.createNewTask(app);
        this.updateTask(app);
        this.deleteTask(app);
    }
    getAllTasks(app) {
        app.route('/tasks').get((req, res) => {
            this.dao.execute(res, (db) => __awaiter(this, void 0, void 0, function* () {
                let result = yield db.collection("Task").find(req.query.userId ? { userId: req.query.userId } : {}).toArray();
                responseHelper_2.OkResponse(res, result);
            }));
        });
    }
    getTask(app) {
        app.route('/tasks/:id').get((req, res) => {
            this.dao.execute(res, (db) => __awaiter(this, void 0, void 0, function* () {
                let result = yield db.collection("Task").findOne({ _id: new mongodb_1.ObjectId(req.params.id) });
                responseHelper_2.OkResponse(res, result);
            }));
        });
    }
    createNewTask(app) {
        app.route('/tasks').post((req, res) => {
            this.dao.execute(res, (db) => __awaiter(this, void 0, void 0, function* () {
                if (requestHelpers_1.requestBodyEmpty(req)) {
                    responseHelper_1.BadRequestResponse(res, "Request body cannot be empty");
                    return;
                }
                let task = new task_1.Task(req.body);
                let result = yield db.collection("Task").insertOne(task);
                task._id = result.insertedId;
                responseHelper_1.CreatedResponse(res, task);
            }));
        });
    }
    updateTask(app) {
        app.route('/tasks/:id').put((req, res) => {
            this.dao.execute(res, (db) => __awaiter(this, void 0, void 0, function* () {
                if (requestHelpers_1.requestBodyEmpty(req)) {
                    responseHelper_1.BadRequestResponse(res, "Request body cannot be empty");
                    return;
                }
                yield db.collection("Task").updateOne({ _id: new mongodb_1.ObjectId(req.params.id) }, { $set: req.body });
                responseHelper_1.OkNoContentResponse(res);
            }));
        });
    }
    deleteTask(app) {
        app.route('/tasks/:id').delete((req, res) => {
            this.dao.execute(res, (db) => __awaiter(this, void 0, void 0, function* () {
                yield db.collection("Task").deleteOne({ _id: new mongodb_1.ObjectId(req.params.id) });
                responseHelper_1.OkNoContentResponse(res);
            }));
        });
    }
}
exports.TaskRoutes = TaskRoutes;
//# sourceMappingURL=taskRoutes.js.map