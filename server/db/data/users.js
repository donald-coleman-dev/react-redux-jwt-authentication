const mongoose = require("mongoose");
const { adminEmail } = require("../../config/vars");

module.exports = [
  {
    email: adminEmail,
    password: "test",
    firstName: "Donald",
    lastName: "Coleman",
    role: mongoose.Types.ObjectId("56cb91bdc3464f14678934ca")
  }
];
