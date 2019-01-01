import { Request } from "express";
import { ObjectID } from "bson";

export class Task {
    _id: ObjectID;
    userId: string;
    title: string;
    details: string;
    createdOn: Date;    
    completed: boolean;    
    completedOn?: Date;

    constructor(requestBody: any){
        this.userId = requestBody.userId;
        this.title = requestBody.title;
        this.details = requestBody.details;
        this.createdOn = requestBody.createdOn;
        this.completed = requestBody.completed ? requestBody.completed : false;        
    }
}