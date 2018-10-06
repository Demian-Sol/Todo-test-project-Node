const mongoose   = require("mongoose"),
      User       = require("../models/user"),
      Todo       = require("../models/todo"),
      todoSeeds  = [
          {
              name: 'task1',
              priority: 0, 
          },
          {
              name: 'task2',
              priority: 2, 
          },
          {
              name: 'task3',
              priority: 1, 
          },
          {
              name: 'task4',
              priority: 3, 
          },
          {
              name: 'task5',
              priority: 1, 
          },
          {
              name: 'task6',
              priority: 2, 
          }],
      userSeeds = [
          {
             username: 'user1',
             password: 'password',
             isAdmin: false
          },
          {
             username: 'user2',
             password: 'password',
             isAdmin: false
          },
          {
             username: 'admin1',
             password: 'password',
             isAdmin: true
          },
          {
             username: 'admin2',
             password: 'password',
             isAdmin: true
          },
      ];

function seedDB() {
  mongoose.connect('mongodb://localhost:27017/allmax', {useNewUrlParser: true});
  mongoose.set('useFindAndModify', false);

  User.deleteMany( {}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Users deleted!');
    }
  });
    
  Todo.deleteMany( {}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Todos deleted!');
    }
  });
  userSeeds.forEach( (user) => {
    User.register(new User({username: user.username, isAdmin: user.isAdmin}), user.password, (err, newUser) => {
      if (err) {
        console.log(err);
      } else {
        todoSeeds.forEach( (todo) => {
          Todo.create(todo, function(err, newTodo) {
            if (err) {
                console.log(err);
            } else {
                User.updateOne(
                    { _id: newUser._id }, 
                    { $push: { todos: newTodo } },
                    function (err) { if (err) {console.log(err);} }
                );
            }
          })
        })
      };
    });
  })
}

seedDB();
    
module.exports = seedDB;