import { MongoClient } from "mongodb";
import { Response } from "express";
import { internalServerErrorResponse, badRequestResponse } from "./utils/response.helper";
import fs from "fs";
import { BadRequestError } from "./errors/bad-request.error";

export class MongoDbClient implements IMongoDbClient {    
    private client: MongoClient;    

    constructor(){            
        const url = this.getConnectionString();
        this.client = new MongoClient(url, {useNewUrlParser: true});           
    }

    private getConnectionString(): string {
        return JSON.parse(fs.readFileSync("./config.json", "UTF-8"));
    }

    public execute(res: Response, func: Function): void {
        this.client.connect(async _ => {
            try{
                const db = this.client.db("Todo");  
                await func(db);
            } catch(err) {
                if(err instanceof BadRequestError) { 
                    badRequestResponse(res, err.message);
                }
                else {
                    internalServerErrorResponse(res, err);
                }                                
            }                               
        });
    }
}

export interface IMongoDbClient {
    execute(res: Response, func: Function): void;
}