const mongoose              = require("mongoose"),
      todoSchema           = new mongoose.Schema({
          name: String,
          priority: Number,
          isDone: {
            type: Boolean,
            default: false
          }
      })

module.exports = mongoose.model('Todo', todoSchema);