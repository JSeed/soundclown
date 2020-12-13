const { success } = require('./util/api-helpers');
const { listAnnotationsByTrackId } = require('./util/annotations-db');

exports.handler = async (event, context) => {
  const trackId = event.queryStringParameters.trackId;
  const annotations = await listAnnotationsByTrackId(trackId);

  return success(annotations);
}
