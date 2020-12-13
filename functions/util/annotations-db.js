const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.DB_ACCESS_KEY,
  secretAccessKey: process.env.DB_SECRET_KEY,
  region: process.env.DB_REGION
});

exports.listAnnotationsByTrackId = async (trackId) => {
  const params = {
    TableName: process.env.DB_ANNOTATIONS_TABLE,
    KeyConditionExpression: "#trackId = :trackId",
    ExpressionAttributeNames: {
      "#trackId": "trackId",
    },
    ExpressionAttributeValues: {
      ":trackId": trackId,
    }
  };

  const queryResponse = await dynamodb.query(params).promise();
  return queryResponse.Items;
}
