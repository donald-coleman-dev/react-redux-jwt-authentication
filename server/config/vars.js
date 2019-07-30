const path = require('path');

require('dotenv-safe').load({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example'),
});

module.exports = {
  env: process.env.API_SERVER_NODE_ENV,
  port: process.env.API_SERVER_PORT,
  jwtSecret: process.env.JWT_SECRET,
  adminEmail: process.env.ADMIN_EMAIL,
  mongo: {
    uri: process.env.API_SERVER_NODE_ENV === 'test'
      ? process.env.MONGO_URI_TESTS
      : process.env.MONGO_URI,
  },
  logs: process.env.API_SERVER_NODE_ENV === 'production' ? 'combined' : 'dev',
};
