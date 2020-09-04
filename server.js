const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const KEYS = require('./config.js');

const app = express();

app.set('view engine', 'ejs');

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.get('/', (req, res) => res.render('SignIn'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

let userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/home', (req, res) => res.render('Home', {user: userProfile}));

app.get('/error', (req, res) => res.send("Failed to login"));

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((obj, cb) => cb(null, obj));

passport.use(new GoogleStrategy({
        clientID: KEYS.google.clientID,
        clientSecret: KEYS.google.clientSecret,
        callbackURL: "http://localhost:5000/auth/google/redirect"
    },
    (accessToken, refreshToken, profile, done) => {
        userProfile = profile;
        return done(null, userProfile);
    }
));

app.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']}));

app.get('/auth/google/redirect',
    passport.authenticate('google', {failureRedirect: '/error'}),
    (req, res) => res.redirect('/home'));