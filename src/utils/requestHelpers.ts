import { Request } from "express";

export function requestBodyEmpty(req: Request): boolean {
    return req.body.constructor === Object && Object.keys(req.body).length === 0;
}