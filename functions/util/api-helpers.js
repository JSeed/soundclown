
const helpers = exports;

helpers.responseStatus = (statusCode) => ({ statusCode });
helpers.success = (body) => ({ ...helpers.responseStatus(200), body: JSON.stringify(body) });
