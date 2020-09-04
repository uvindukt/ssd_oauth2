const {Router} = require('express');
const passport = require('passport');

let router = Router();

/**
 * @desc Authentication verification route.
 */
router.get('/', (req, res) => (req.user) ? res.redirect('/home') : res.redirect('/auth/google'));

/**
 * @desc Google authentication request route.
 */
router.get('/google', passport.authenticate("google", {
    scope: ['profile', "https://www.googleapis.com/auth/drive.file", "email"]
}));

/**
 * @desc Google authentication response route.
 */
router.get('/google/redirect', passport.authenticate('google'), (req, res) => res.redirect('/home'));

/**
 * @desc Logout route.
 */
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;