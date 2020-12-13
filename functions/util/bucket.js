const AWS = require('aws-sdk');

const endpoint = new AWS.Endpoint(process.env.BUCKET_ENDPOINT);
const credentials = new AWS.Credentials(process.env.BUCKET_ACCESS_KEY, process.env.BUCKET_SECRET_KEY);
const s3 = new AWS.S3({ endpoint, credentials });

exports.listObjects = async (prefix) => s3.listObjectsV2({
  Bucket: process.env.BUCKET_NAME,
  Prefix: prefix,
}).promise();


exports.getSignedDownloadUrl = async (object) => s3.getSignedUrlPromise('getObject', {
  Bucket: process.env.BUCKET_NAME,
  Key: object.Key,
});
