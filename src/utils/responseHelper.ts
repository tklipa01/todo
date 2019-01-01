import { Response } from "express";

export function CreatedResponse<T extends object>(res: Response,  result: T) {
    res.status(201).json(result);
}

export function OkResponse<T extends object>(res: Response, result: T) {
    res.status(200).json(result);
}

export function OkNoContentResponse(res: Response) {
    res.status(204).json(null);
}

export function BadRequestResponse(res: Response, result: any) {
    res.status(400).json(result);
}

export function InternalServerErrorResponse(res: Response) {
    res.status(500).json(null);
}