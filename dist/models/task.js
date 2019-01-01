"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(requestBody) {
        this.userId = requestBody.userId;
        this.title = requestBody.title;
        this.details = requestBody.details;
        this.createdOn = requestBody.createdOn;
        this.completed = requestBody.completed ? requestBody.completed : false;
    }
}
exports.Task = Task;
//# sourceMappingURL=task.js.map