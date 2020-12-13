const AWS = require('aws-sdk');

const TRACK_MEDIA_PREFIX = 'tracks/';
const endpoint = new AWS.Endpoint(process.env.BUCKET_ENDPOINT);
const credentials = new AWS.Credentials(process.env.BUCKET_ACCESS_KEY, process.env.BUCKET_SECRET_KEY);
const s3 = new AWS.S3({ endpoint, credentials });

// TODO - decode [source: https://gist.github.com/jhurliman/1250118/09d7e584ddba7f7c37fd028d2d704497c06d1916]
const encodeId = (val) => new Buffer(val).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

const returnStatus = (statusCode) => ({ statusCode });
const successResponse = (body) => ({ ...returnStatus(200), body: JSON.stringify(body)});

const getTrackList = async () => {
  const objects = await s3.listObjectsV2({
    Bucket: process.env.BUCKET_NAME,
    Prefix: TRACK_MEDIA_PREFIX,
  }).promise();


  const tracks = await Promise.all(
    objects.Contents
      .filter((object) => object.Size > 0)
      .map(async (object) => ({
        id: encodeId(object.Key),
        title: object.Key.split('/').pop(),
        url: await s3.getSignedUrlPromise('getObject', {
          Bucket: process.env.BUCKET_NAME,
          Key: object.Key,
        }),
      })));

  return successResponse(tracks);
}

exports.handler = async (event, context) => {
  return getTrackList();
}

