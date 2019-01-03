//https://tools.ietf.org/html/rfc7807
export class ProblemDetail {

    type: string;
    title: string;
    detail: string;
    status: number;
    extensions?: Map<string, object>;

    constructor(type: string, title: string, detail: string, status: number){
        this.type = type;
        this.title = title;
        this.detail = detail;
        this.status = status;        
    }
}