var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oidc');

var router = express.Router();
authUser = (request, accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}
passport.serializeUser( (user, done) => {
    done(null, user)
 })

passport.deserializeUser((user, done) => {
    done (null, user)
})


passport.initialize() // init passport on every route call
passport.session()   //allow passport to use "express-session"

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:8081"+process.env.REDIRECT_URI,
    passReqToCallback: true,
},authUser) 
);

router.get('/auth/login/google', passport.authenticate('google',{scope:['email','profile']}));

router.get('/red/callback',passport.authenticate( 'google', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));


module.exports = router;