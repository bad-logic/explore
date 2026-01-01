const componentQuery = require('./../database/mongo.query');
const taskCollection = require('./task.model');
const dataMapper = require('./helpers/task.mapper');

function insertTask(newData) {
    console.log('i insert tasks');
    return componentQuery.insertDataIntoCollection(newData, dataMapper, taskCollection);
}

function fetchAllTasks(condition) {
    return componentQuery.getDataFromCollection(condition, taskCollection);
}

function fetchTaskById(condition) {
    return componentQuery.getDataFromCollection(condition, taskCollection);
}

function editTaskById(id, newdata) {
    return componentQuery.editDataInCollectionById(id, newdata, dataMapper, taskCollection);
}

function deleteTaskById(id) {
    return componentQuery.deleteDataFromCollection(id, taskCollection);
}
module.exports = {
    insertTask,
    fetchAllTasks,
    fetchTaskById,
    editTaskById,
    deleteTaskById
}