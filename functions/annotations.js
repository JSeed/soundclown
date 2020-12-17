const { requireAuth } = require("./util/requireAuth");
const { success, error } = require('./util/api-helpers');
const { listAnnotations, addAnnotation, deleteAnnotation } = require('./util/annotations-db');


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

const create = async (event, context) => {
  const annotation = JSON.parse(event.body);
  annotation.user = context.identityContext.claims.username || 'unknown';
  // TODO - validate request body body
  return tryDb(() => addAnnotation(annotation));
}

const destroy = async (event) => {
  // TODO - check user before deleting
  const { trackId, annotationId } = JSON.parse(event.body);
  return tryDb(() => deleteAnnotation({ trackId, annotationId }));
}

const list = async (event) => {
  const trackId = event.queryStringParameters.trackId;
  return tryDb(() => listAnnotations(trackId));
}

exports.handler = requireAuth(async (event, context) => {
  if (event.httpMethod === 'GET') {
    return list(event, context);
  } else if (event.httpMethod === 'POST') {
    return create(event, context);
  } else if (event.httpMethod === 'DELETE') {
    return destroy(event, context);
  }

  return error(404, 'Bad route')
});
