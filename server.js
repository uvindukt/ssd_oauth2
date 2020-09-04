const express = require('express');
const passport = require('passport');
const fileUpload = require('express-fileupload');
const cookieSession = require('cookie-session');

// Configuration keys
const KEYS = require('./config/keys');

const app = express();

// Session
app.use(cookieSession({keys: [KEYS.session.secret]}));

// PassportJS configuration
require('./config/config.passport.js');

// PassportJS initialization
app.use(passport.initialize());
app.use(passport.session());

// Server-side rendering engine
app.set('view engine', 'ejs');

// File upload intercept middleware
app.use(fileUpload());

// Routes
app.use('', require('./routes/route.home'));
app.use('/auth', require('./routes/route.auth'));

// Port and Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));