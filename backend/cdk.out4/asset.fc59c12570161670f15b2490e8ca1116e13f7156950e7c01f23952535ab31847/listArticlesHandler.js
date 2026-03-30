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
        const { category, search } = event.queryStringParameters || {};
        if (category) {
            const command = new lib_dynamodb_1.QueryCommand({
                TableName: TABLE_NAME,
                IndexName: 'categoryIndex',
                KeyConditionExpression: 'category = :category',
                ExpressionAttributeValues: {
                    ':category': category,
                },
                ScanIndexForward: false,
            });
            const response = await docClient.send(command);
            const articles = (response.Items || []);
            return createResponse(200, {
                articles,
                count: articles.length,
            });
        }
        if (search) {
            const command = new lib_dynamodb_1.ScanCommand({
                TableName: TABLE_NAME,
                FilterExpression: 'contains(title, :search) OR contains(summary, :search)',
                ExpressionAttributeValues: {
                    ':search': search,
                },
            });
            const response = await docClient.send(command);
            const articles = (response.Items || []);
            return createResponse(200, {
                articles,
                count: articles.length,
            });
        }
        const command = new lib_dynamodb_1.ScanCommand({
            TableName: TABLE_NAME,
            Limit: 50,
        });
        const response = await docClient.send(command);
        const articles = (response.Items || []);
        articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        return createResponse(200, {
            articles,
            count: articles.length,
        });
    }
    catch (error) {
        console.error('Error listing articles:', error);
        return createResponse(500, {
            error: 'Failed to retrieve articles',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
//# sourceMappingURL=listArticlesHandler.js.map