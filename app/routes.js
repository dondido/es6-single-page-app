const merge = require('merge'),
    path = require('path'),
    es6Renderer = require('express-es6-template-engine'),
    /*routes = require(__dirname + '/../dist/routes.json'),*/
    exist = require(__dirname + '/../custom_modules/module-exist'),
    mailer = require('express-mailer'),
    /* Private email config file will not be available on git. This config file
    needs to be created. */
    emailCfg = exist(__dirname + "/../private/emailcfg.js") || {
      to: 'gmail.user@gmail.com',
      auth: {
              user: 'gmail.user@gmail.com',
              pass: 'userpass'
          }
    };

module.exports = function (app, passport, Account) {
    var redirectHash = function(req, res, path) {
        return req.xhr ? res.json(
            {
                path: path,
                account: req.isAuthenticated() ? req.user.username : ''
            }
        ) : res.redirect(path);
    };
    app.engine('html', es6Renderer);
    app.set('views', app.get('folder'));
    app.set('view engine', 'html');
    // Initialize the data
    mailer.extend(app, merge({
        host: 'smtp.gmail.com', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    }, emailCfg));

    app.post('/registration', function(req, res) {
        Account.register(
            new Account(
                {
                    username: decodeURIComponent(req.body.fullname),
                    email: req.body.email
                }
            ),
            req.body.password, 
            function(err) {
                if (err) { 
                    console.log('Error while registering user!', err); 
                    return redirectHash(req, res, '#register-error');
                }
                passport.authenticate('local', function(err, user, info) {
                    if (!user) {
                        console.log('Error while loging user!', err); 
                        return redirectHash(req, res, '#register-error');
                    }
                    req.logIn(user, function() {
                        return redirectHash(req, res, '/');
                    });
                })(req, res);
            }
        );
    });

    app.post('/', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            if (!user) {
                return redirectHash(req, res, '#login-error');
            }
            if (!req.body.remember){
                /* Each session has a unique cookie object accompany it. This allows
                us to alter the session cookie per visitor. We can set
                req.session.cookie.expires to false to enable the cookie to remain
                for only the duration of the user-agent. This user should log in
                again after restarting the browser. */
                req.session.cookie.expires = false;
            }
            /* When built-in options are not enough for handling an authentication
            request, a custom callback can be provided to allow the application to
            handle success or failure. Authentication functionality is called from
            within the route handler, rather than being used as route middleware.
            This provides convinient callback access to the req and res objects
            through closure. */
            req.logIn(user, function() {
                return redirectHash(req, res, '/');
            });
        })(req, res, next);
    });

    app.post('/logout', function(req, res) {
        /* Passport exposes a logout() function on reqthat can be called from
        any route handler which needs to terminate a login session. Invoking
        logout() will remove the req.user property and clear the login session
        (if any). This however does not set req.session.cookie.expires to its
        default value so req.session.destroy needs to be invoked. */
        req.logout();
        req.session.destroy();
        redirectHash(req, res, '/');
    });

    /* Token key is generated and sent to the email address provided by the user. */
    app.post('/forgot-password', function(req, res) {
        var setResetToken = function(err, user) {
            var sendEmail = function(model) {
                app.mailer.send(
                    'html/email',
                    {
                        to: req.body.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                        subject: 'Password token',
                        locals: {
                            token: req.headers.host + '/reset-password?token=' + model.token
                        }
                    },
                    function(err) {
                        if (err) {
                          console.log('There was an error sending the email', err);
                        }
                    });
            };
            //documentation can be found here https://www.npmjs.com/package/mongoose-token
            user.setToken().then(sendEmail);
        };
        Account.findByUsername(req.body.email, setResetToken);
        req.xhr ? res.end() : res.redirect('#check-email');
    });

    /* Once the user has received the unique token, the token value needs to be
    entered when filling in the new password form. */
    app.post('/update-password', function(req, res) {
        var rb = req.body,
            notifyUpdate = function(err){
                redirectHash(req, res, err ? '#password-update-error' : '#password-updated');
            },
            updatePassword = function(err, user){
                if (err || !user) {
                    return redirectHash(req, res, '#password-update-error');
                }
                user.updatePassword(rb.new_password, notifyUpdate);
            };
        if(rb.new_password === rb.confirm_password){
            req.user.authenticate(rb.old_password, updatePassword);
        }
    });

    app.post('/reset-password', function(req, res) {
        var query,
            resetToken,
            rb = req.body;
        //password comparison is made here (the same is done on the front end too)
        if(rb.new_password === rb.confirm_password) {
            query = req.headers.referer.split('?')[1];
            if(query) {
                resetToken = query.split('=')[1];
                if(resetToken) {
                    Account.resetPassword(resetToken, rb.new_password);
                }
            }
        }
        req.xhr ? res.end() : res.redirect('#password-updated');
    });

    app.use(function(req, res, next){
        var dict,
            folder = app.get('folder'),
            path = req.path === '/' ? '/' : req.path.replace(/\//g, '');
        if('/' === path) {
            if(req.isAuthenticated()) {
                console.log(111, req.session, req.user)
                dict = {
                    locals: {
                        token: req.csrfToken(),
                        username: req.user.username
                    },
                    partials: {main: folder + '/html/account.html'}
                };
            }
            else {
                dict = {
                    locals: {token: req.csrfToken()},
                    partials: {main: folder + '/html/login.html'}
                };
            }
        }
        else if('update-password' === path) {
            if(req.isAuthenticated()) {
                dict = {
                    locals: {
                        token: req.csrfToken()
                    },
                    partials: {main: folder + '/html/update-password.html'}
                };
            }
            else {
                return res.redirect('/');
            }
        }
        else if ('registration' === path) {
            dict = {
                locals: {token: req.csrfToken()},
                partials: {main: folder + '/html/registration.html'}
            };   
        }
        else if ('forgot-password' === path) {
            dict = {
                locals: {token: req.csrfToken()},
                partials: {main: folder + '/html/forgot-password.html'}
            };   
        }
        else if ('reset-password' === path) {
            dict = {
                locals: {token: req.csrfToken()},
                partials: {main: folder + '/html/reset-password.html'}
            };   
        }
        if(dict) {
            dict.locals.account = req.isAuthenticated() ? 'account' : '';
            return res.render('index', dict);
        }
        next();
    });
};