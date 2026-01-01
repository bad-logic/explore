module.exports = function mapper(dbObj, reqObj) {
    if (reqObj.email) {
        dbObj.email = reqObj.email;
    }
    if (reqObj.password) {
        dbObj.password = reqObj.password;
    }
}