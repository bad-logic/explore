const taskQuery = require('./task.query');
const list = require('./../list/list.model');

function getTasks(req, res, next) {

    var condition = {
        _listid: req.params.listId
    }
    console.log("condition>>", condition);
    taskQuery.fetchAllTasks(condition)
        .then(function(data) {
            res.json(data);
        })
        .catch(function(err) {
            next(err);
        });
}

function getTaskById(req, res, next) {
    var condition = {
        _id: req.params.taskId,
        _listid: req.params.listId
    }
    console.log("condition>>", condition);
    taskQuery.fetchTaskById(condition)
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            next(err);
        });
}

function insertTask(req, res, next) {
    console.log("request body>>>", req.body);
    // first make sure that the list id sent is valid or exists in database
    // In case you deleted the list but if you know the list id
    //  you can still create task within that list id although the list 
    //  has already been deleted
    list.findOne({
            _id: req.params.listId,
            _userId: req.user_id
        }).then((list) => {
            if (!list) {
                return false;
            }
            return true;
            // output of this then block will be the input to next then block
            //  this is called chaining and done with .(dot) operator
        }).then((canCreateTask) => {
            if (canCreateTask) {
                var reqData = {};
                reqData.title = req.body.title;
                reqData.listId = req.params.listId;
                console.log("data from client>>>", reqData);
                taskQuery.insertTask(reqData)
                    .then(function(data) {
                        res.json(data);
                    })
                    .catch(function(err) {
                        next(err);
                    });
            } else {
                res.sendStatus(404);
            }
        })
        .catch(err => next(err));
}

function deleteTaskById(req, res, next) {
    console.log("req.params.id>>>", req.params.taskId);
    list.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (!list) {
            return false;
        }
        return true;
    }).then((canDeleteTask) => {
        if (canDeleteTask) {
            // so while deleting first find by taskId and listId
            taskQuery.deleteTaskById(req.params.taskId).then((data) => res.json(data)).catch((err) => next(err));
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => next(err));
}

function editTaskById(req, res, next) {
    console.log("req.params.id>>>", req.params.taskId);
    console.log("request body>>>", req.body);
    // here even though the user and the listId is verified 
    // we have edited the task solely with the task id
    //  so even if we have provide the list id of another list and task id of task within another list
    // still we can edit the task
    // this can be visible through postman
    // but eventhough list and task are from different lists 
    // they must be of same user
    list.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        if (!list) {
            return false;
        }
        return true;
    }).then((canEditTask) => {
        if (canEditTask) {
            // so while editing first find by taskId and listId
            taskQuery.editTaskById(req.params.taskId, req.body).then((data) => { res.json(data) }).catch((err) => { next(err) });
        } else {
            res.sendStatus(404);
        }
    }).catch((err) => next(err));
}
module.exports = {
    getTasks,
    getTaskById,
    insertTask,
    deleteTaskById,
    editTaskById
}