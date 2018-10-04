const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose"),
      todo1Schema            = new mongoose.Schema({
          name: String,
          priority: Number
      })

todo1Schema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Todo', todo1Schema);