import AWS from 'aws-sdk';

export const call = ({action, params}) => {
	if(process.env.IS_OFFLINE || process.env.IS_LOCAL){
		AWS.config.update({
			endpoint: new AWS.Endpoint(process.env.DB_ENDPOINT),
			accessKeyId: process.env.ACCESS_KEY_ID,
			secretAccessKey: process.env.SECRET_ACCESS_KEY,
			region: process.env.REGION,
		});
	}

	/* AWS.config.getCredentials(err => {
		if(err) console.log(err);
		else{
			console.log(AWS.config);
		}
	}); */

	const docClient = new AWS.DynamoDB();

	return docClient[action](params).promise();
};