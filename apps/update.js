import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async (event, context) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      'Section': {'S':'apps'},
      'DateCompleted': {'S':'2017-12-31'}
    },
    UpdateExpression: 'SET #Name = :newName, #Type = :newType',
    ExpressionAttributeNames: {
      '#Name': 'Name',
      '#Type': 'Type'
    },
    ExpressionAttributeValues: {
      ':newName': {'S':'illicoweb'},
      ':newType': {'S':'work'}
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const data = await dynamoDbLib.call({
      action: 'updateItem',
      params: params
    });

    return success(data);
  } catch(e) {
    return failure(e.statusCode, {
      code: e.code,
      message: e.message
    });
  }
};