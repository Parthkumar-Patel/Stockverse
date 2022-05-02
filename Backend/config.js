// Author : Sai Rahul Kodumuru (B00875628)
require('dotenv').config();

const config = {
  ENV: process.env.NODE_ENV || 'Development',
  PORT: process.env.PORT || 5000,
  DB_NAME: process.env.DB_NAME,
  DB_URL:
    process.env.PROD_DB_URL +
      process.env.DB_NAME +
      process.env.DB_CONN_OPTIONS || 'mongodb://localhost:27017/stockverse',
  STRIPE_KEY: process.env.STRIPE_KEY,
  NODE_JS_VERSION: process.version || 'NodeJS Version not found',
};

console.log(
  `\n-> Time: ${new Date()}
-> Current Environment: ${config.ENV}
-> NodeJS Version: ${config.NODE_JS_VERSION}
-> Loading the env context with: ${Object.keys(process.env).length} keys`
);

module.exports = config;
