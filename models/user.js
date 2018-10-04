const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose"),
      userSchema            = new mongoose.Schema({
          username: String,
          password: String,
          isAdmin: Boolean,
          todos: [
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Todo'
              }
          ]
      })

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);