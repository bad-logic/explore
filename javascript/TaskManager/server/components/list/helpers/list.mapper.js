module.exports = (dbData, reqData) => {
    if (reqData.title) {
        dbData.title = reqData.title;
    }
    if (reqData.user_id) {
        dbData._userId = reqData.user_id;
    }
}