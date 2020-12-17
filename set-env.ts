const { writeFile } = require('fs');
// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.ts';
// Load node modules
const colors = require('colors');
require('dotenv').config();
// `environment.ts` file structure
const envConfigFile = `
export const environment = {
  production: ${process.env.PRODUCTION},
  baseUrl: '/.netlify/functions/',
  auth0: {
    domain: '${process.env.AUTH0_DOMAIN}',
    clientId: '${process.env.AUTH0_CLIENT_ID}',
    audience: '${process.env.JWT_AUDIENCE}'
  }
};
`;
console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(colors.grey(envConfigFile));

writeFile(targetPath, envConfigFile,  (err) => {
  if (err) {
    throw console.error(err);
  } else {
    console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});
