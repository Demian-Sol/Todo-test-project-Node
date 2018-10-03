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
    secret: 'To do or not to do, that is a question',
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

app.get('/todos', (req, res) => {
  res.render('index', {pagetitle: 'Show all todos'});
})

app.listen(process.env.PORT, process.env.IP, (req, res) => {
  console.log('Ready to do todo');
})
