const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose"),
      userSchema            = new mongoose.Schema({
          username: String,
          password: String,
          isAdmin: Boolean
      })

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);