import { Request } from "express";
import { BadRequestError } from "../errors/bad-request.error";

export function validateRequestBodyExists(req: Request): void {
    if(requestBodyEmpty(req)) {
        throw new BadRequestError("Request body cannot be empty");        
    }
}

export function validateRequestBodyParams(req: Request, ...paramsToValidate: string[]): void {
    for(let p of paramsToValidate) {
        if(!req.body[p]){
            throw new BadRequestError(`${p} is a required parameter`);
        }
    }
}

export function validateRequestParams(req: Request, ...paramsToValidate: string[]): void {
    for(let p of paramsToValidate) {
        if(!req.query[p]){
            throw new BadRequestError(`${p} is a required parameter`);
        }
    }
}

function requestBodyEmpty(req: Request): boolean {
    return req.body.constructor === Object && Object.keys(req.body).length === 0;
}