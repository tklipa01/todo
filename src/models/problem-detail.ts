//https://tools.ietf.org/html/rfc7807
export class ProblemDetail {

    type: string;
    title: string;
    detail: string;
    status: number;
    extensions?: Map<string, object>;

    constructor(init?: Partial<ProblemDetail>){
        Object.assign(this, init);
    }
}