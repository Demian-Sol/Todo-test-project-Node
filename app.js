const express        = require("express"),
      app            = express(),
      mongoose       = require("mongoose"),
      passport       = require("passport"),
      LocalStrategy  = require("passport-local"),
      bodyParser     = require("body-parser"),
      methodOverride = require("method-override"),
      Todo           = require("./models/todo"),
      User           = require("./models/user");
      
mongoose.connect('mongodb://localhost:27017/allmax-todo-project-db', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

app.set('view engine', 'ejs');
app.use( bodyParser.urlencoded({extended: true}) );
app.use( express.static(`${__dirname}/public`));
app.use( methodOverride('_method'));

app.use( require("express-session")({
    secret: 'To do or not to do, that is the question',
    resave: false,
    saveUninitialized: false
}));
app.use( passport.initialize() );
app.use( passport.session() );

passport.use( new LocalStrategy( User.authenticate() ) );
passport.serializeUser( User.serializeUser() );
passport.deserializeUser( User.deserializeUser() );

app.use( (req, res, next) => {
  res.locals.currentUser = req.currentUser;
  next();
})

app.get('/', (req, res) => {
  res.render('home', {pagetitle: 'Allmax test todo app'});
})

//REST routes

app.get('/todos', isLoggedIn, (req, res) => {
  if (req.user.isAdmin) {
    User.find( {} ).populate('todos').exec( (err, users) => {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else {
        res.render('index', {pagetitle: 'Show all todos', userData: users});
      }
    })
  } else {
    User.findById(req.user._id).populate('todos').exec( (err, user) => {
      if (err) {
        console.log(err);
        res.redirect('back');
      } else {
        const userData = [user];
        res.render('index', {pagetitle: 'Show all todos', userData: userData});
      }
    })
  }
})

//Auth routes
app.get('/register', (req, res) => {
 res.render('register', {pagetitle: 'Create new account'});
})

app.post('/register', (req, res) => {
  // console.log(req.body);
  User.register(new User({username: req.body.username, isAdmin: req.body.isAdmin}), req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect('back');
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect('/todos');
      });
    }
  });
});

app.get('/login', (req, res) => {
  res.render('login', {pagetitle: 'Enter using existing account'});
})

app.post('/login', passport.authenticate('local', {
  successRedirect: '/todos',
  failureRedirect: '/login'
}), (req, res) => {})

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
    res.redirect('/login');
}

app.listen(process.env.PORT, process.env.IP, (req, res) => {
  console.log('Ready to do todo');
})
