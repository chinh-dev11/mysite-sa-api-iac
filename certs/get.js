import * as dynamodbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async (event, context) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    KeyConditionExpression: '#PK = :pkValue',
    ExpressionAttributeNames: {'#PK': 'Section'},
    ExpressionAttributeValues: {':pkValue': 'certs'},
    ScanIndexForward: false // descending order
  };

  try {
    const data = await dynamodbLib.call({
      action: 'query',
      params: params
    });

    return success(data.Items);
  } catch(e) {
    return failure(e.statusCode, {
      code: e.code,
      message: e.message
    });
  }
};