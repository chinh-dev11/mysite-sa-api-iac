import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib';

export const main = async (event, context) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      Section: {
        S: "apps"
      },
      DateCompleted: {
        S: "2017-12-01"
      },
      Type: {
        S: "work"
      },
      Name: {
        S: "illico"
      },
      Languages: {
        SS: [
          "AngularJS (v1.5)", "jQuery", "Java", "Oracle Commerce"
        ]
      },
      Image: {
        M: {
          "En": {
            S: "videotron-mobility-640-en.jpg"
          },
          "Fr": {
            S: "videotron-mobility-640-fr.jpg"
          }
        }
      },
      Url: {
        M: {
          "En": {
            S: "https://videotron.com/en"
          },
          "Fr": {
            S: "https://videotron.com/"
          }
        }
      }
    }
  };

  try {
    const data = await dynamoDbLib.call({
      action: 'putItem',
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