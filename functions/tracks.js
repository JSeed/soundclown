
const bucket = require('./util/bucket');
const { success } = require('./util/api-helpers');
const { urlEncode } = require('./util/base64');

const TRACK_MEDIA_PREFIX = 'tracks/';


const getTrackList = async () => {
  const objects = await bucket.listObjects(TRACK_MEDIA_PREFIX);

  const tracks = await Promise.all(
    objects.Contents
      .filter((object) => object.Size > 0)
      .map(async (object) => ({
        id: urlEncode(object.Key),
        title: object.Key.split('/').pop(),
        url: await bucket.getSignedDownloadUrl(object),
      })));

  return success(tracks);
}

exports.handler = async (event, context) => {
  return getTrackList();
}

