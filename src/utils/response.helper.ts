import { Response } from "express";
import { ProblemDetail } from "../models/problem-detail";

export function createdResponse(res: Response,  result: any) {
    res.status(201).json(result);
}

export function okResponse(res: Response, result: any) {
    res.status(200).json(result);
}

export function okNoContentResponse(res: Response) {
    res.status(204).json(null);
}

export function badRequestResponse(res: Response, detail: string) {
    const statusCode = 400;
    let problemDetail = new ProblemDetail({
        title: "Invalid Request",
        type: `https://httpstatuses.com/${statusCode}`,
        detail: detail,
        status: statusCode
    });
    res.status(statusCode).type('application/problem+json').json(problemDetail);
}

export function internalServerErrorResponse(res: Response, err: Error) {
    res.status(500).json(err);
}