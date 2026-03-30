"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = handler;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({});
const docClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.TABLE_NAME || 'Articles';
function createResponse(statusCode, body) {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
        body: JSON.stringify(body),
    };
}
async function handler(event) {
    try {
        const articleId = event.pathParameters?.id;
        if (!articleId) {
            return createResponse(400, {
                error: 'Article ID is required',
            });
        }
        const command = new lib_dynamodb_1.GetCommand({
            TableName: TABLE_NAME,
            Key: {
                articleId,
            },
        });
        const response = await docClient.send(command);
        if (!response.Item) {
            return createResponse(404, {
                error: 'Article not found',
            });
        }
        const article = response.Item;
        return createResponse(200, article);
    }
    catch (error) {
        console.error('Error getting article:', error);
        return createResponse(500, {
            error: 'Failed to retrieve article',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
//# sourceMappingURL=getArticleHandler.js.map