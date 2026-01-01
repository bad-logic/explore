const listQuery = require('./list.query');

function getlists(req, res, next) {
    var condition = {
        _userId: req.user_id
    }
    console.log("condition>>>", condition);
    listQuery.fetchAllists(condition)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        });
}

function getlistById(req, res, next) {
    var condition = {
        _id: req.params.id,
        _userId: req.user_id
    }
    console.log("condition>>", condition);
    listQuery.fetchListById(condition)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        })
}

function insertlist(req, res, next) {
    // console.log("request user id added at authenticate>>>", req.user_id);
    // console.log("request body>>>", req.body);
    let newData = { user_id: req.user_id, title: req.body.title };
    listQuery.insertlist(newData)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        });
}

function deletelistById(req, res, next) {
    console.log("req.params.id>>>", req.params.id);
    // It is better to delete the list if id and user_id both are matched
    //  here any other user can delete the list of another user if the listId is known
    //  but in frontend we only show the lists of the authenticated user so... the user can only 
    //  delete their own list only
    //  still it is better to match both userId and list Id before deleting
    const listId = req.params.id;
    listQuery.deletelistById(listId)
        .then(
            (data) => {
                // also delete all the tasks inside this particular listId 
                res.json(data);
                listQuery.deletelistTasks(listId).then((data) => {
                    console.log("deleted tasks from ", listId);
                })
            }
        )
        .catch((err) => next(err));
}

function editlistById(req, res, next) {
    console.log("req.params.id>>>", req.params.id);
    console.log("request body>>>", req.body);
    // It is better to edit the list if id and user_id both are matched
    //  here any other user can edit the list of another user if the listId is known
    //  but in frontend we only show the lists of the authenticated user so... the user can only 
    //  edit their own list only
    //  still it is better to match both userId and list Id before deleting
    listQuery.editlistById(req.params.id, req.body).then((data) => { res.json(data) }).catch((err) => { next(err) });
}
module.exports = {
    getlists,
    getlistById,
    insertlist,
    deletelistById,
    editlistById
}