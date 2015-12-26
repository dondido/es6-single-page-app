var merge = require('merge'),
    path = require('path'),
    fs = require('fs'),
    es6Renderer = require('express-es6-template-engine'),
    routes = require(__dirname + '/../src/routes.json'),
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

    /*app.get('/', function (req, res) {
        res.render(
            'index',
            {
                isAuthenticated: req.isAuthenticated(),
                csrfToken: req.csrfToken()
            }
        );
        console.log(112, req.path, routes[req.path]);
        res.sendFile(path.join(__dirname + '/../src/index.html'))
    });*/

    /*app.get('/*', function (req, res) {
        res.render(
            'index',
            {f
                isAuthenticated: req.isAuthenticated(),
                csrfToken: req.csrfToken()
            }
        );
        console.log(111, req.path, routes[req.path]);
        res.sendFile(path.join(__dirname + '/../src/index.html'))
    });*/
    // route to handle all app requests
    app.use(function(req, res, next){
        var dict,
            path = req.path === '/' ? '/' : req.path.replace(/\//g, '');
        console.log(110, path, req.csrfToken(), req.isAuthenticated(), req.user)
        if(routes[path]) {
            // if (req.xhr) {
            //     if ('registration' === path) {
            //         re
            //     }
            // }
            if('/' === path) {
                /*titleTpl = '${engineName} - The fastest javascript template string engine!',
                cb = (err, content) => {return err || content},
                compiledTitle = es6Renderer(titleTpl, {locals:{engineName: 'ES6 Renderer'}, template: true}, cb);*/
                if(req.isAuthenticated()) {
                    dict = {
                        locals: {username: req.user.username},
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
            else if ('registration' === path) {
                dict = {
                    locals: {token: req.csrfToken()},
                    partials: {main: 'src/html/registration.html'}
                };   
            }
            return res.render('index', dict);
            //return res.sendFile(path.join(__dirname + '/../src/index.html'))
        }
        next();
    });

    /*function(err, req, res, next){
   
   if(routes[req.path]) {
    return res.sendFile(path.join(__dirname + '/../src/index.html'))
   }
   
}*/

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
                    console.log('error while user register!', err); 
                    //return next(err);
                    console.log('user registered!');
                    res.redirect('back');
                    return;
                }
                passport.authenticate('local')(req, res, function () {
                    res.json(
                        {
                            fullName: req.user.username
                        }
                    )
                });
            }
        );
    });

    app.post('/account', passport.authenticate('local'), function(req, res) {
        console.log(222)
        if (!req.body.remember){
            /* Each session has a unique cookie object accompany it. This allows
            us to alter the session cookie per visitor. We can set
            req.session.cookie.expires to false to enable the cookie to remain
            for only the duration of the user-agent. This user should log in
            again after restarting the browser. */
            req.session.cookie.expires = false;
        }
        res.json(
            {
                fullName: req.user.username,
                token: req.csrfToken()
            }
        )
    });

    app.post('/logout', function(req, res) {
        /* Passport exposes a logout() function on reqthat can be called from
        any route handler which needs to terminate a login session. Invoking
        logout() will remove the req.user property and clear the login session
        (if any). This however does not set req.session.cookie.expires to its
        default value so req.session.destroy needs to be invoked. */
        req.logout();
        req.session.destroy();
        res.redirect('back');
    });

    /* Token key is generated and sent to the email address provided by the user. */
    app.post('/forgotten', function(req, res) {

        Account.findByUsername(req.body.email, function(err, existingUser) {
            app.mailer.send(
            'email',
            {
                to: req.body.email, // REQUIRED. This can be a comma delimited string just like a normal email to field.
                subject: 'Password token',
                token: req.csrfToken()
            },
            function (err) {
                var emailstatus = 'submit-success';
                if (err) {
                  // handle error
                  console.log('There was an error sending the email');
                  emailstatus = 'submit-fail';
                }
                res.render('forgotten', {email: req.body.email});
            });
        });
    });

    /* Once the user has received the unique token, the token value needs to be
    entered when filling in the new password form. */
    app.post('/updatepass', function(req, res) {
        var rb = req.body;
        if (rb.new_password === rb.confirm_password){
            Account.findByUsername(
                req.body.email,
                function(err, user){
                    Account.updatePassword(
                        user,
                        rb.new_password,
                        function(){
                            res.redirect('/');
                        }
                    );
                }
            )
        }
    });

    app.post('/reset', function(req, res) {
        var rb = req.body;
        if (rb.new_password === rb.confirm_password){
            Account.authenticate()(
                req.user.email,
                rb.password,
                function(err, user){
                    Account.updatePassword(
                        user,
                        rb.new_password,
                        function(){
                            res.redirect('/');
                        }
                    );
                }
            );
        }
    });
};