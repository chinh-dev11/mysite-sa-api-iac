import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async (event, context) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      'Section': {'S':'apps'},
      'DateCompleted': {'S':'2017-12-01'}
    },
    ConditionExpression: 'attribute_exists(#Name)',
    ExpressionAttributeNames: {'#Name': 'Name'},
    ReturnValues: 'ALL_OLD'
  };

  try {
    const data = await dynamoDbLib.call({
      action: 'deleteItem',
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