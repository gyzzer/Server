var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

var data = {test: 'testdata'};

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/test', ensureAuthenticated,  function(req, res, next) {
    res.render('testView', { title: 'Test View' });
});

router.post('/test', ensureAuthenticated,  function(req, res, next) {
    console.log(req.body.state);
    User.getUserByUsername(req.user.username, function(err, user) {
        if (err) {
            return done(err);
        }



    });

});

router.post('/login',
    passport.authenticate('local', { failureRedirect: '/'}),
    function(req, res) {

    console.log('You are now logged in');
    console.log(req.user);
    res.send('success').end();

});

router.post('/register', function(req, res, next) {
    console.log('posted to register');
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    // Form Validator
    req.checkBody('username', 'username is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('email', 'email is not vaild').isEmail();
    req.checkBody('password', 'password is required').notEmpty();
    req.checkBody('password2', 'passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        console.log(errors);
    } else {
        User.getUserByUsername(username, function (err, user) {
            if (err) { return done(err); }
            if(!user){
                console.log('is not a user');
                var newUser = new User({
                    username: username,
                    email: email,
                    password: password
                });

                User.createUser(newUser, function (err, user) {
                    if(err) throw err;
                });
            } else {
                console.log(user);
                console.log('is already a user');
            }

        });

        res.location('/');
        res.redirect('/');
    }
});

router.post('/',
    passport.authenticate('local'),
    function (req, res) {
        console.log('we got to here');
        res.redirect('/users/test');
    });

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.getUserById(id, function(err, user){
        done(err, user);
    });
});

passport.use(new LocalStrategy(function(username, password, done){
    User.getUserByUsername(username, function(err, user){
        if (err) { return done(err); }
        if(!user){
            return done(null, false, {message: 'Unknown User'})
        }
        User.comparePassword(password, user.password, function(err, isMatch){
            if(err) throw err;
            if(isMatch){
                return done(null, user);
            } else {
                return done(null, false, {message: 'Invalid Password'})
            }
        })
        //http://www.passportjs.org/docs/username-password/
    });
}));

function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/')
}

module.exports = router;
