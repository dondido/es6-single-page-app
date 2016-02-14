var path = require('path'),
    express = require('express'),
    http = require('http'),
    /* This app uses sessions to remember whether the user is logged in or not
    Using sessions to keep track of users as they journey through site is
    key to any respectable app. Sessions will accessible through the request
    object in each route. */
    session = require('express-session'),
    /* When the node app restarts, all session related data will be lost.
    MongoStore allows us to store the Express sessions into MongoDB instead of
    using the MemoryStore, which is a store for development use only,
    bundled with Express. */
    MongoStore = require('connect-mongo')(session),
    /* The csurf middleware provides easy-to-use protection against
    Cross Site Request Forgeries. */
    csrf = require('csurf'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    /* Here we find an appropriate database to connect to, defaulting to
    localhost if we don't find one. */
    uristring = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/passport_local_csrf',
    passport = require('passport'),
    /* The http server will listen to an appropriate port,
    or default to port 8001. */
    port = process.env.PORT || 3000,
    favicon = require('serve-favicon'),
    compression = require('compression'),
    Account = require(__dirname +'/app/models/account'),
  app = express();

// Configuration
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');
//app.set('view options', { layout: false });

app.use(favicon('./src/favicon.ico'));

// Switch off the default 'X-Powered-By: Express' header
app.disable('x-powered-by');

// compress all requests
app.use(compression());

/* Makes connection asynchronously.  Mongoose will queue up database
operations and release them when the connection is complete. */
mongoose.connect(uristring, function (err, res) {
  if (err) {
  console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
  console.log ('Succeeded connected to: ' + uristring);
  }
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());
/* Secret to the session initialiser is provided, which adds a little 
more security for our session data. Of course you might what to use a 
key that is a little more secure. */
app.use(
  session(
    {
            secret: process.env.SESSION_SECRET || 'secret',
            resave: false,
            saveUninitialized: true,
            cookie : {
                maxAge : 7 * 24 * 60 * 60 * 1000 // seconds which equals 1 week
            }
        }
  )
);

app.use(passport.initialize());
app.use(passport.session());

// Configure passport
passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Important : csrf should be added after cookie and session initialization.
// Otherwise you will get 'Error: misconfigured csrf'
app.use(csrf());
app.use(function(req, res, next) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});
// error handler for csrf tokens
/**/app.use(function (err, req, res, next) {
    console.log(113, err.code, req.url, req.body);
    //return;
    if (err.code !== 'EBADCSRFTOKEN') {
        return next(err);
    }
    // handle CSRF token errors here
    res.status(403);
    res.send('Session has expired or form tampered with.');
})

//app.use(express.static(path.join(__dirname, 'src')));

require(__dirname +'/app/routes')(app, passport, Account);
app.use(express.static(__dirname + '/src'));
http.createServer(app).listen(port);