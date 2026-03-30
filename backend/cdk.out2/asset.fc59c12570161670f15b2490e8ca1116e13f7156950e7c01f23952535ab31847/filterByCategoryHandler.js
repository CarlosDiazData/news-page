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
const validCategories = ['technology', 'sports', 'world', 'culture'];
async function handler(event) {
    try {
        const { category } = event.queryStringParameters || {};
        if (!category) {
            return createResponse(400, {
                error: 'Category parameter is required',
            });
        }
        const normalizedCategory = category.toLowerCase();
        if (!validCategories.includes(normalizedCategory)) {
            return createResponse(400, {
                error: 'Invalid category',
                validCategories,
            });
        }
        const command = new lib_dynamodb_1.QueryCommand({
            TableName: TABLE_NAME,
            IndexName: 'categoryIndex',
            KeyConditionExpression: 'category = :category',
            ExpressionAttributeValues: {
                ':category': normalizedCategory,
            },
            ScanIndexForward: false,
        });
        const response = await docClient.send(command);
        const articles = (response.Items || []);
        return createResponse(200, {
            articles,
            count: articles.length,
            category: normalizedCategory,
        });
    }
    catch (error) {
        console.error('Error filtering articles by category:', error);
        return createResponse(500, {
            error: 'Failed to filter articles',
            message: error instanceof Error ? error.message : 'Unknown error',
        });
    }
}
//# sourceMappingURL=filterByCategoryHandler.js.map