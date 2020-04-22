import * as dynamodbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async (event, context) => {
	// console.log(event);
	// console.log(context); //LambdaContext
	const params = { // all apps
		TableName: process.env.TABLE_NAME,
		KeyConditionExpression: '#PK = :pkValue',
		ExpressionAttributeNames: { '#PK': 'Section' },
		ExpressionAttributeValues: { ':pkValue': 'apps'	},
		ScanIndexForward: false // descending order
	};

	if(event.queryStringParameters) {
		params.IndexName = 'TypeIndex';
		params.KeyConditionExpression = '#PK = :pkValue';
		params.ExpressionAttributeNames = { '#PK': 'Type' };
		params.ExpressionAttributeValues = { ':pkValue': event.queryStringParameters.type	}; // work or lab
		params.ScanIndexForward = false; // descending order
	}

	try {
		const data = await dynamodbLib.call({
			action: 'query',
			params: params
		});

		return success(data.Items);
	} catch (e) {
		return failure(e.statusCode, {
			code: e.code,
			message: e.message
		});
	}
};
