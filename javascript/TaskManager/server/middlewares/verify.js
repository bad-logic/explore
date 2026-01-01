const userModel = require('./../components/user/user.model');
const jwt = require('jsonwebtoken');
const user = require('./../components/user/user.model');


// purpose: to check whether the request has a valid JWT token
function authenticate(req, res, next) {
    const token = req.header('x-access-token');
    // verify the jwt
    jwt.verify(token, user.getJWTSecret(), (err, done) => {
        if (err) {
            //there was error
            // invalid jwt
            //do not authenticate
            res.status(401).send(err)
        } else {
            //jwt is valid
            req.user_id = done._id;
            next();
        }
    });

}

function verifySession(req, res, next) {

    // grab the refresh token from the request header
    let refreshToken = req.header('x-refresh-token');

    //grab the _id from the request header
    let _id = req.header("_id");

    userModel.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            //user couldnot be found
            return Promise.reject({
                'error': 'user not found make sure that the refreshToken and user id are correct'
            });
        }

        // if code reaches here - the user is found
        // therefore the refresh token exists in the database
        // but we still have to check if it has expired or not

        req.user_id = user._id;
        req.userObject = user;
        req.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                // check if the session had expired
                if (userModel.hasRefreshTokenExpired(session.expiresAt) === false) {
                    //refresh token has not expired
                    isSessionValid = true;
                }
            }
        });
        if (isSessionValid) {
            // the session is VALID - call next()
            next();
        } else {
            // the session is not valid
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        res.status(401).send(e);
    });

}
module.exports = {
    verifySession,
    authenticate
}