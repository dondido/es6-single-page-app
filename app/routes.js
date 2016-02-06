var merge = require('merge'),
    path = require('path'),
    es6Renderer = require('express-es6-template-engine'),
    /*routes = require(__dirname + '/../src/routes.json'),*/
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
    }


module.exports = function (app, passport, Account) {
    app.engine('html', es6Renderer);
    app.set('views', 'src');
    app.set('view engine', 'html');
    // Initialize the data
    mailer.extend(app, merge({
        host: 'smtp.gmail.com', // hostname
        secureConnection: true, // use SSL
        port: 465, // port for secure SMTP
        transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    }, emailCfg));

    app.post('/register', function(req, res) {
        Account.register(
            new Account(
                {
                    username: req.body.fullname,
                    email: req.body.email
                }
            ),
            req.body.password, 
            function(err) {
                if (err) { 
                    console.log('Error while registering user!', err); 
                    return;
                }
                passport.authenticate('local')(req, res, function() {
                    if(req.xhr) {
                        res.send('/');
                    }
                    else {
                        res.redirect('/');
                    }
                });
            }
        );
    });

    app.post('/account', passport.authenticate('local'), function(req, res) {
        if (!req.body.remember){
            /* Each session has a unique cookie object accompany it. This allows
            us to alter the session cookie per visitor. We can set
            req.session.cookie.expires to false to enable the cookie to remain
            for only the duration of the user-agent. This user should log in
            again after restarting the browser. */
            req.session.cookie.expires = false;
        }
        if(req.xhr) {
            es6Renderer('src/html/account.html',
                {
                    locals: {
                        token: req.csrfToken(),
                        username: req.user.username
                    }
                },
                function(err, content) {
                    if(err) {
                        return;
                    }
                    res.json({
                        user: 1,
                        html: {
                            main: content
                        }
                    });
                }
            );
        }
        else {
            res.redirect('back');
        }
    });

    app.post('/logout', function(req, res) {
        /* Passport exposes a logout() function on reqthat can be called from
        any route handler which needs to terminate a login session. Invoking
        logout() will remove the req.user property and clear the login session
        (if any). This however does not set req.session.cookie.expires to its
        default value so req.session.destroy needs to be invoked. */
        if(req.xhr) {
            es6Renderer('src/html/login.html',
                {
                    locals: {
                        token: req.csrfToken(),
                        username: req.user.username
                    }
                },
                function(err, content) {
                    if(err) {
                        return;
                    }
                    res.json({
                        user: 0,
                        html: {
                            main: content
                        }
                    });
                }
            );
        }
        else {
            res.redirect('back');
        }
        req.logout();
        req.session.destroy();
    });

    /* Token key is generated and sent to the email address provided by the user. */
    app.post('/forgotten', function(req, res) {
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
        res.end();
    });

    /* Once the user has received the unique token, the token value needs to be
    entered when filling in the new password form. */
    app.post('/updatepass', function(req, res) {
        var rb = req.body,
            notifyUpdate = function(err){
                console.log(124, req.body.email, req.body._csrf);
                if(req.xhr) {
                    res.json({
                        classList: {
                            add: err ? 'error' : 'success'
                        }
                    });
                }
                else {
                    res.render(
                        'index', 
                        {
                            locals: {submitState: err ? 'error' : 'success'},
                            partials: {main: 'src/html/check-email.html'}
                        }
                    );
                }
            },
            updatePassword = function(err, user){
                console.log(122, err, user)
                user.updatePassword(rb.new_password, notifyUpdate);
            },
            checkPassword = function(err, user) {
                console.log(121, err, user)
                user.authenticate(rb.old_password, updatePassword);
            };
        if (rb.new_password === rb.confirm_password){
            Account.findByUsername(req.user.email, checkPassword);
        }
    });

    app.post('/reset', function(req, res) {
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
        if(req.xhr) {
            res.json({
                path: '/'
            });
        }
        else {
            res.redirect('/');
        }
    });

    app.use(function(req, res, next){
        var dict,
            path = req.path === '/' ? '/' : req.path.replace(/\//g, '');
        if('/' === path) {
            if(req.isAuthenticated()) {
                dict = {
                    locals: {
                        token: req.csrfToken(),
                        username: req.user.username
                    },
                    partials: {main: 'src/html/account.html'}
                };
            }
            else {
                dict = {
                    locals: {token: req.csrfToken()},
                    partials: {main: 'src/html/login.html'}
                }
            }
        }
        else if('update-password' === path) {
            if(req.isAuthenticated()) {
                dict = {
                    locals: {
                        token: req.csrfToken(),
                        submitState: ''
                    },
                    partials: {main: 'src/html/update-password.html'}
                };
            }
            else {
                dict = {
                    locals: {token: req.csrfToken()},
                    partials: {main: 'src/html/login.html'}
                }
            }
        }
        else if ('registration' === path) {
            dict = {
                locals: {token: req.csrfToken()},
                partials: {main: 'src/html/registration.html'}
            };   
        }
        else if ('forgotten-password' === path) {
            dict = {
                locals: {token: req.csrfToken()},
                partials: {main: 'src/html/forgotten-password.html'}
            };   
        }
        else if ('reset-password' === path) {
            dict = {
                locals: {token: req.csrfToken()},
                partials: {main: 'src/html/reset-password.html'}
            };   
        }
        else if ('check-email' === path) {
            dict = {
                partials: {main: 'src/html/check-email.html'}
            };   
        }
        if(dict) {
            return res.render('index', dict);
        }
        next();
    });
};