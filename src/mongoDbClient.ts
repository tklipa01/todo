import { MongoClient, Db } from "mongodb";
import { Response } from "express";
import { InternalServerErrorResponse } from "./utils/responseHelper";
import fs from "fs";

export class MongoDbClient {    
    private client: MongoClient;    

    constructor(){
        const MongoClient = require("mongodb").MongoClient;        
        const url = this.getConnectionString();
        this.client = new MongoClient(url, {useNewUrlParser: true});           
    }

    private getConnectionString(): string {
        return JSON.parse(fs.readFileSync("./config.json", "UTF-8"));
    }

    public execute(res: Response, func: Function): void {
        this.client.connect(err => {
            try{
                const db = this.client.db("Todo");  
                func(db);
            } catch {
                console.error(err);
                InternalServerErrorResponse(res);
            }                               
        });
    }
}