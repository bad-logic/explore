const { mongoose } = require('./../../config/db.config');
const schema = mongoose.Schema;
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const jwtSecret = 'lsadjflkj#%234%^%&878739$%^&*(nvcx,nvioqueryt';

const userSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        // minlength: 8
        minlength: 4

    },
    sessions: [{
        token: {
            type: String,
            required: true
        },
        expiresAt: {
            type: Number,
            required: true
        }
    }]
});

// *** INSTANCE METHODS ***

userSchema.methods.toJSON = function() {
    const user = this;
    const userObject = user.toObject();

    // return the document except the password and sessions(they should not be made available)
    return _.omit(userObject, ['password', 'sessions']);
}
userSchema.methods.generateAccessAuthToken = function() {
    const user = this;
    return new Promise((resolve, reject) => {
        //create the JSON web token and return that
        //  json web token also accessToken expires in 10 m
        //  we have new accessToken every 10 m
        jwt.sign({ _id: user._id.toHexString() }, jwtSecret, { expiresIn: "10m" }, (err, token) => {
            if (!err) {
                return resolve(token);
            }
            return reject(err);
        })
    });
}
userSchema.methods.generateRefreshAuthToken = function() {
    //this method simply generates a 64byte hex string - it doesnot save it to the database. 
    // saveSessionToDatabase() does that
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buffer) => {
            if (!err) {
                let token = buffer.toString('hex');
                return resolve(token);
            }
        })
    });
}

// session = Refresh Token + Expiry Time
userSchema.methods.createSession = function() {
    let user = this;
    return user.generateRefreshAuthToken().then((refreshToken) => {
        return saveSessionToDatabase(user, refreshToken);
    }).then((refreshToken) => {
        // saved to database successfully
        // now return the refresh token
        return refreshToken;

    }).catch((e) => {
        return Promise.reject('Failed to save sessions to database.\n' + e);
    })
}

// *** MODEL METHODS (static methods) ***
userSchema.statics.getJWTSecret = () => {
    return jwtSecret;
}
userSchema.statics.findByIdAndToken = function(_id, token) {
    // finds user by id and token
    // used in auth middleware (verification)
    const user = this;
    return user.findOne({
        _id,
        'sessions.token': token
    });
}

userSchema.statics.findByCredentials = function(email, password) {
    let user = this;
    return user.findOne({ email }).then((user) => {
        if (!user) return Promise.reject();

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    resolve(user);
                } else {
                    reject();
                }
            });
        });
    });
}

userSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    let secondsSinceEpoch = Date.now() / 1000;
    if (expiresAt > secondsSinceEpoch) {
        // hasnot expired
        return false;
    } else {
        // has expired
        return true;
    }
}

// *** MIDDLEWARES  ***
// Before a user document is saved, this code runs
userSchema.pre('save', function(next) {
    let user = this;
    let costFactor = 10;
    if (user.isModified('password')) {
        // if the password field has been changed then run this code.
        // generate salt and hash the password
        bcrypt.genSalt(costFactor, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// *** HELPER METHODS ***
let saveSessionToDatabase = (user, refreshToken) => {
    //save session to database
    return new Promise((resolve, reject) => {
        let expiresAt = generateRefreshTokenExpiryTime();
        user.sessions.push({
            'token': refreshToken,
            expiresAt
        });
        user.save().then(() => {
            return resolve(refreshToken);
        }).catch((e) => {
            reject(e);
        });
    });
}
let generateRefreshTokenExpiryTime = () => {
    //  refreshToken expires in 10 days
    //  that is if not logged out for 10 days
    //  you can use the same refresh token to get new json web token/accessToken
    // on every logIn new accessToken and refreshToken in sent in the headers
    let daysUntilExpire = "10";
    let secondsUntilExpire = ((daysUntilExpire * 24) * 60) * 60;
    return ((Date.now() / 1000) + secondsUntilExpire);
}
const userModel = mongoose.model('user', userSchema);
module.exports = userModel