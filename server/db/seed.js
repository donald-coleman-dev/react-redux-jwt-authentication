const UserModel = require('../api/models/user.model');
const RoleModel = require('../api/models/role.model');
const mongoose = require('mongoose');
const { mongo, env, adminEmail } = require('../config/vars');
const seedRoles = require('./data/roles');
const seedUsers = require('./data/users');

mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error while trying to seed data: ${err}`);
  process.exit(-1);
});

if (env === 'development') {
  mongoose.set('debug', true);
}

mongoose.connect(mongo.uri, { keepAlive: 1, useNewUrlParser: true })
  .then(() => {
    RoleModel.find({})
      .then(roles => {
        if (roles.length === 0) {
          return RoleModel.create(seedRoles);
        }

        return true;
      })
      .then(() => UserModel.findOne({ email: adminEmail }))
      .then(adminUser => {
        if (!adminUser) {
          return UserModel.create(seedUsers);
        }

        return true;
      })
      .then(() => {
        mongoose.disconnect();
        process.exit();
      })
      .catch(err => console.error(err));
  })
  .catch(err => console.error(err));
