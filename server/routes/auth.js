const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send("User logged out")
});

router.get('/current-user', (req, res) => {
    res.send({user: req.user});
})

router.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) return next(err);
        console.log("user is ", user)
        if (!user) {
            console.log("no user?????")
            console.log(info.message);
            res.send(info);
        }
        else {
            req.login(user, (err) => {
                console.log("in login in signup")
                if (err) return next(err);
                res.send(info)
            });
        }
    })(req, res, next);
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            console.log(info.message);
            res.send(info);
        }
        else {
            req.login(user, (err) => {
                if (err) return next(err);
                res.send(info);
            })
        }
        console.log(req.user);
    })(req, res, next);
})

module.exports = router;