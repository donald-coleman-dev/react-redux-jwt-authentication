const { port, env } = require('./config/vars');
const app = require('./config/express');
const mongoose = require('./config/mongoose');

// Open mongoose connection
mongoose.connect()
  .then(() => {
    // listen to requests
    app.listen(port, () => console.info(`Api server started on port ${port} (${env})`));
  });

/**
* Exports express
* @public
*/
module.exports = app;
