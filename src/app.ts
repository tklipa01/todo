import express from "express";
import * as bodyParser from "body-parser";
import { TaskRoutes } from "./routes/task-routes";
import { MongoDbClient } from "./mongodb-client";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import cors from 'cors';

class App {    
    public app: express.Application;
    
    private mongoDbClient = new MongoDbClient();
    private taskRoutes: TaskRoutes = new TaskRoutes(this.mongoDbClient);

    constructor(){
        this.app = express();
        this.config();
        this.taskRoutes.routes(this.app);
    }

    private config(): void {
        this.app.use(cors());
        this.app.use(bodyParser.json());      
        
        const jwtCheck = jwt({
            secret: jwks.expressJwtSecret({
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

export default new App().app;



