const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const KEYS = require('./keys')

// Serializing user data to user object
passport.serializeUser((user, done) => {

    let userProfile = {
        id: user.googleId,
        accessToken: user.accessToken,
        name: user.name,
        imageUrl: user.imageUrl,
        email: user.email
    }

    done(null, userProfile);
})

// De-serializing user data from user object
passport.deserializeUser((userProfile, done) => done(null, userProfile));

// PassportJS configuration
passport.use(
    new GoogleStrategy(
        {
            clientID: KEYS.google.clientId,
            clientSecret: KEYS.google.clientSecret,
            callbackURL: KEYS.google.redirectUris[0],
            passReqToCallback: true

        }, (request, accessToken, refreshToken, profile, done) => {

            user = {
                "accessToken": accessToken,
                'googleId': profile.id,
                'name': profile.displayName,
                'imageUrl': profile._json.picture,
                'email': profile._json.email
            }

            done(null, user)
        }
    )
)