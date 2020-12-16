const bucket = require('./util/bucket');
const { success, error } = require('./util/api-helpers');
const { urlEncode } = require('./util/base64');

const TRACK_MEDIA_PREFIX = 'tracks/';
const TRACK_PEAKS_PREFIX = 'peaks/';

const getTrackList = async () => {
  try {
    const objects = await bucket.listObjects(TRACK_MEDIA_PREFIX);

    const tracks = await Promise.all(
      objects.Contents
        .filter((object) => object.Size > 0)
        .map(async (object) => {
          const fileName = object.Key.split('/').slice(1).join('/');
          return {
            id: urlEncode(fileName),
            title: fileName,
            mediaUrl: await bucket.getSignedDownloadUrl(object.Key),
            peaksUrl: await bucket.getSignedDownloadUrl(`${TRACK_PEAKS_PREFIX}${fileName}.json`),
          };
        }));

    return success(tracks);
  } catch (err) {
    console.log('getTrackList error:', err);
    return error(500, err);
  }
}

exports.handler = async (event, context) => {
  return getTrackList();
}

