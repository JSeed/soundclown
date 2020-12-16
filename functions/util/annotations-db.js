const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

const dynamodb = new AWS.DynamoDB.DocumentClient({
  accessKeyId: process.env.DB_ACCESS_KEY,
  secretAccessKey: process.env.DB_SECRET_KEY,
  region: process.env.DB_REGION
});

/**
 * Expects:
 * {
 *   trackId: string,
 *   user: string,
 *   seconds: string,
 *   message: string
 * }
 */
exports.addAnnotation = async (annotation) => {
  const params = {
    TableName: process.env.DB_ANNOTATIONS_TABLE,
    Item: {
      trackId: annotation.trackId,
      id: uuid(),
      user: annotation.user,
      seconds: annotation.seconds,
      message: annotation.message,
    }
  };

  await dynamodb.put(params).promise();
  return params.Item;
}

exports.deleteAnnotation = async ({trackId, annotationId}) => {
  const params = {
    TableName: process.env.DB_ANNOTATIONS_TABLE,
    Key: {
      id: annotationId,
      trackId: trackId,
    }
  };

  await dynamodb.delete(params).promise();
};

exports.listAnnotations = async (trackId) => {
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
