interface Response {
    statusCode: number;
    headers: {
        'Content-Type': string;
        'Access-Control-Allow-Origin': string;
        'Access-Control-Allow-Headers': string;
    };
    body: string;
}
export declare function handler(event: {
    pathParameters?: {
        id?: string;
    };
}): Promise<Response>;
export {};
//# sourceMappingURL=getArticleHandler.d.ts.map