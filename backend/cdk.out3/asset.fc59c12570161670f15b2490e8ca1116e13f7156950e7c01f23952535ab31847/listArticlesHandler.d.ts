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
    queryStringParameters?: {
        category?: string;
        search?: string;
    };
}): Promise<Response>;
export {};
//# sourceMappingURL=listArticlesHandler.d.ts.map