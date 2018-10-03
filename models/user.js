const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose"),
      userSchema            = new mongoose.Schema({
          name: String,
          clearance: {type: Number, default: 0}
      })

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);