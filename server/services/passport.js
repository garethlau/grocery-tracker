const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

passport.use('local-signup', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, username, password, done) => {
        console.log(req.body)
        let {email} = req.body;
        User.findOne({email: email}, (err, user) => {
            if (err) return done(err);
            if (user) {
                return done(null, false, {message: "Email already exists"});
            }
            else {
                let newUser = User();
                newUser.email = email;
                newUser.username = username;
                newUser.password = newUser.generateHash(password);
                newUser.save().then(savedUser => {
                    console.log("user saved", savedUser)
                    return done(null, savedUser, {message: "User signed up"});
                }).catch(err => {
                    console.error(err);
                    return done(null, false, {message: "Error saving the new user"})
                })
            }
        })
    }
))

passport.use('local-login', new LocalStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (err) return done(err);
            if (!user) {
                return done(null, false, {message: "User does not exist"});
            }
            const hash = user.password;
            if (!user.validPassword(password, hash)) {
                return done(null, false, {message: "Incorrect password"});
            }
            return done(null, user, {message: "User logged in"})
        });
    }
))


module.exports = passport;