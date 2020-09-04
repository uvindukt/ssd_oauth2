const {Router} = require('express');
const {google} = require('googleapis');

const router = Router();

/**
 * @desc Initial route.
 */
router.get('/', (req, res) => res.render('SignIn'));

/**
 * @desc Home page route.
 */
router.get('/home', (req, res) => {

    if (!req.user) {

        res.redirect('/auth/google');

    } else {

        let user = {
            googleId: req.user.id,
            name: req.user.name,
            imageUrl: req.user.imageUrl,
            email: req.user.email
        };

        if (req.query.uploadStatus) {

            (req.query.uploadStatus === "success")
                ? user.uploadStatus = "success"
                : (req.query.uploadStatus === "failed")
                    ? user.uploadStatus = "failed"
                    : user.uploadStatus = undefined;
        }

        res.render('Home', {user, error: false});
    }
});

/**
 * @desc File upload route.
 */
router.post('/upload', (req, res) => {

    if (!req.user) {

        res.redirect('/auth/google');

    } else {

        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
            'access_token': req.user.accessToken
        });

        const drive = google.drive({
            version: 'v3',
            auth: oauth2Client
        });

        let {name: fileName, mimetype, data} = req.files.file;
        fileName = `${Date.now()}_${fileName}`;

        drive.files.create({
            requestBody: {
                name: fileName,
                mimeType: mimetype
            },
            media: {
                mimeType: mimetype,
                body: Buffer.from(data).toString()
            }
        }).then(data => {

            (data.status === 200)
                ? res.redirect('/home?uploadStatus=success')
                : res.redirect('/home?uploadStatus=failed')

        }).catch(err => console.error(err));
    }
});

module.exports = router;

