import { Application } from "express";
import { Request, Response } from "express";
import { IMongoDbClient } from "../mongodb-client";
import { Db, ObjectId } from "mongodb";
import { Task } from "../models/task";
import { validateRequestBodyExists, validateRequestBodyParams, validateRequestParams } from "../utils/request.helpers";
import { okResponse, createdResponse,  okNoContentResponse } from "../utils/response.helper";

export class TaskRoutes {    

    private dao: IMongoDbClient;
    constructor(mongoDbClient: IMongoDbClient){
        this.dao = mongoDbClient;
    }

    public routes(app: Application): void {        
        this.getAllTasks(app);   
        this.getTask(app);     
        this.createNewTask(app);
        this.updateTask(app);
        this.deleteTask(app);
        this.deleteManyTasks(app);
    }

    private getAllTasks(app: Application): void {
        app.route('/tasks').get((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {                
                let result: Task[] = await db.collection("Task").find(req.query.userId ? { userId: req.query.userId} : {}).toArray();
                okResponse(res, result);
            });
        });
    }

    private getTask(app: Application): void {
        app.route('/tasks/:id').get((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {
                let result: Task = await db.collection("Task").findOne({_id: new ObjectId(req.params.id)});
                okResponse(res, result);                
            });
        });
    }

    private createNewTask(app: Application): void {
        app.route('/tasks').post((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {
                validateRequestBodyExists(req);
                validateRequestBodyParams(req, "userId", "createdOn");
                let task = new Task(req.body);                
                let result = await db.collection("Task").insertOne(task);
                task._id = result.insertedId;
                createdResponse(res, task);
            });
        });
    }

    private updateTask(app: Application): void {
        app.route('/tasks/:id').put((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {
                validateRequestBodyExists(req);
                await db.collection("Task").updateOne({ _id: new ObjectId(req.params.id)}, { $set: req.body });
                okNoContentResponse(res);                
            })
        });
    }

    private deleteTask(app: Application): void {
        app.route('/tasks/:id').delete((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {
                await db.collection("Task").deleteOne({ _id: new ObjectId(req.params.id)});
                okNoContentResponse(res);
            });
        });
    }

    private deleteManyTasks(app: Application): void {
        app.route('/tasks').delete((req: Request, res: Response) => {
            this.dao.execute(res, async (db: Db) => {
                validateRequestParams(req, "userId");
                let result = await db.collection("Task").deleteMany({ userId: req.query.userId, completed: true });
                okResponse(res, `${result.deletedCount} documents deleted`);
            });
        })
    }
}