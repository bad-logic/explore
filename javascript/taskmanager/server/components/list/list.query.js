const componentQuery = require('./../database/mongo.query');
const listCollection = require('./list.model');
const dataMapper = require('./helpers/list.mapper');
const taskCollection = require('./../task/task.model');

function insertlist(newData) {
    return componentQuery.insertDataIntoCollection(newData, dataMapper, listCollection);
}

function fetchAllists(condition) {
    return componentQuery.getDataFromCollection(condition, listCollection);
}

function fetchListById(condition) {
    return componentQuery.getDataFromCollection(condition, listCollection);
}

function editlistById(id, newdata) {
    return componentQuery.editDataInCollectionById(id, newdata, dataMapper, listCollection);
}

function deletelistById(id) {
    return componentQuery.deleteDataFromCollection(id, listCollection);
}

function deletelistTasks(id) {
    return componentQuery.deleteManyFromCollection({ _listid: id }, taskCollection);
}
module.exports = {
    insertlist,
    fetchAllists,
    fetchListById,
    editlistById,
    deletelistById,
    deletelistTasks
}