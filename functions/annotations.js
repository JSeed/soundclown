const { success, error } = require('./util/api-helpers');
const { listAnnotations, addAnnotation } = require('./util/annotations-db');

const tryDb = async (fn) => {
  try {
    const res = await fn();
    return success(res);
  } catch (err) {
    console.log('annotations-db error:', err);
    /// TODO - Better error handling
    return error(500, err);
  }
}

const create = async (event) => {
  const annotation = JSON.parse(event.body);
  // TODO - validate request body body
  return tryDb(() => addAnnotation(annotation));
}

const list = async (event) => {
  const trackId = event.queryStringParameters.trackId;
  return tryDb(() => listAnnotations(trackId));
}

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    return list(event);
  } else if (event.httpMethod === 'POST') {
    return create(event);
  }
}
