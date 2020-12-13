// SOURCE - https://gist.github.com/jhurliman/1250118/09d7e584ddba7f7c37fd028d2d704497c06d1916

const base64 = exports;

base64.encode = (unencoded) => new Buffer(unencoded || '').toString('base64');

base64.decode = (encoded) => new Buffer(encoded || '', 'base64').toString('utf8');

base64.urlEncode = (unencoded) => base64.encode(unencoded).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

base64.urlDecode = (encoded) => {
  encoded = encoded.replace(/-/g, '+').replace(/_/g, '/');
  while (encoded.length % 4) {
    encoded += '=';
  }
  return base64.decode(encoded);
};
