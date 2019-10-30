const mapper = require('./helpers/user.mapper');
const userModel = require('./user.model');


function signUp(req, res, next) {
    console.log("req object>>", req.body);
    let newUser = new userModel({});
    console.log("new user>>", newUser);
    mapper(newUser, req.body);
    console.log("mapped user>>", newUser);
    newUser.save()
        .then(() => {
            return newUser.createSession();
        })
        .then((refreshToken) => {
            // session created successfully. refreshToken returned
            // now we generate an access auth token for the user
            console.log("refreshtoken>>>", refreshToken);
            return newUser.generateAccessAuthToken().then((accessToken) => {
                //access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        })
        .then((authToken) => {
            // now we construct and send the response to the user 
            // with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authToken.refreshToken)
                .header('x-access-token', authToken.accessToken)
                .send(newUser);
        })
        .catch((e) => {
            next(e);
        });
}

function login(req, res, next) {
    let email = req.body.email;
    let password = req.body.password;
    console.log("req body>>>", req.body);
    userModel.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            // session created succressfully . refreshToken returned
            // now we generate an access auth token for the user
            return user.generateAccessAuthToken().then((accessToken) => {
                //access auth token generated successfully, now we return an object containing the auth tokens
                return { accessToken, refreshToken }
            });
        }).then((authToken) => {
            // now we construct and send the response to the user 
            // with their auth tokens in the header and the user object in the body
            res
                .header('x-refresh-token', authToken.refreshToken)
                .header('x-access-token', authToken.accessToken)
                .send(user);
        })
    }).catch((e) => {
        res.status(400).send(e);
    });
}

function getAccessToken(req, res, next) {
    // we used middleware before this function so we know that the user/caller
    // is authenticated and we have the user_id and user object is available to us
    // console.log("req.userobject>>", req.userObject);
    req.userObject.generateAccessAuthToken().then((accessToken) => {
        res.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        res.status(400).send(e);
    });
}

module.exports = {
    signUp,
    login,
    getAccessToken
}