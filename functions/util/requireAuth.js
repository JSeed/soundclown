const { removeNamespaces, NetlifyJwtVerifier } = require("@serverless-jwt/netlify");

const verifyJwt = NetlifyJwtVerifier({
  issuer: process.env.JWT_ISSUER,
  audience: process.env.JWT_AUDIENCE,
  mapClaims: (claims) => {
    return removeNamespaces(process.env.JWT_NAMESPACE, claims);
  }
});

module.exports.requireAuth = verifyJwt;
