
const helpers = exports;

helpers.responseStatus = (statusCode) => ({ statusCode });
helpers.jsonBody = (body) => ({ body: JSON.stringify(body) });
helpers.success = (body) => ({ ...helpers.responseStatus(200), ...helpers.jsonBody(body) });
helpers.error = (code, body) => ({ ...helpers.responseStatus(500), ...helpers.jsonBody(body) });
