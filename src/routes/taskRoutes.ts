import { Application } from "express";
import {Request, Response} from "express";
import { MongoDbClient } from "../mongoDbClient";
import { Db, ObjectId } from "mongodb";
import { Task } from "../models/task";
import { requestBodyEmpty } from "../utils/requestHelpers";
import { CreatedResponse, BadRequestResponse, OkNoContentResponse } from "../utils/responseHelper";
import { OkResponse } from "../utils/responseHelper";

export class TaskRoutes {    

    private dao: MongoDbClient;
    constructor(mongoDbClient: MongoDbClient){
        this.dao = mongoDbClient;
    }

    public routes(app: Application): void {
        this.getAllTasks(app);   
        this.getTask(app);     
        this.createNewTask(app);
        this.updateTask(app);
        this.deleteTask(app);
    }

    private getAllTasks(app: Application): void {
        app.route('/tasks').get((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {                
                let result = await db.collection("Task").find(req.query.userId ? { userId: req.query.userId} : {}).toArray();
                OkResponse(res, result);
            });
        });
    }

    private getTask(app: Application): void {
        app.route('/tasks/:id').get((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {
                let result = await db.collection("Task").findOne({_id: new ObjectId(req.params.id)});
                OkResponse(res, result);
            });
        });
    }

    private createNewTask(app: Application): void {
        app.route('/tasks').post((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {
                if(requestBodyEmpty(req)) {
                    BadRequestResponse(res, "Request body cannot be empty");
                    return;
                }
                let task = new Task(req.body);                
                let result = await db.collection("Task").insertOne(task);
                task._id = result.insertedId;
                CreatedResponse(res, task);
            });
        });
    }

    private updateTask(app: Application): void {
        app.route('/tasks/:id').put((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {
                if(requestBodyEmpty(req)){
                    BadRequestResponse(res, "Request body cannot be empty");
                    return;
                }     
                await db.collection("Task").updateOne({ _id: new ObjectId(req.params.id)}, { $set: req.body });
                OkNoContentResponse(res);                
            })
        });
    }

    private deleteTask(app: Application): void {
        app.route('/tasks/:id').delete((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {
                await db.collection("Task").deleteOne({ _id: new ObjectId(req.params.id)});
                OkNoContentResponse(res);
            });
        });
    }
}