const mongoose              = require("mongoose"),
      passportLocalMongoose = require("passport-local-mongoose"),
      todoSchema            = new mongoose.Schema({
          name: String,
          priority: Number
      })

todoSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Todo', todoSchema);