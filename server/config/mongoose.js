const mongoose = require('mongoose');
const { mongo, env } = require('./vars');

// Set mongoose Promise to Bluebird
mongoose.Promise = require('bluebird');

// Exit application on error
mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// Print mongoose logs in dev env
if (env === 'development') {
  mongoose.set('debug', true);
}

/**
* Connect to mongo db
* @returns {promise}
* @public
*/
exports.connect = () => mongoose.connect(mongo.uri, { keepAlive: 1, useNewUrlParser: true });

/**
* Disconnect from mongo db
* @returns {promise}
* @public
*/
exports.disconnect = () => mongoose.disconnect();
